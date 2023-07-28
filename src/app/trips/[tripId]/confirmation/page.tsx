'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import ptBR from "date-fns/locale/pt-BR";

import { Trip } from "@prisma/client";

import Button from "@/components/Button";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {

  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const router = useRouter();

  const { status, data } = useSession();

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`http://localhost:3000/api/trips/check`, {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate')
        }),
      });

      const res = await response.json();

      if (res?.error) {
        return router.push('/');
      }

      setTrip(res.trip);
      setTotalPrice(res.totalPrice);
    };

    if (status === 'unauthenticated') {
      router.push('/');
    }

    fetchTrip();
  }, [status, searchParams, params, router]);

  if (!trip) return null;

  const handleBuyClick = async () => {
    const res = await fetch('http://localhost:3000/api/payment', {
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate'),
          guests: Number(searchParams.get('guests')),
          totalPrice,
          coverImage: trip.coverImage,
          name: trip.name,
          description: trip.description,
        })
      ),
    });

    if(!res.ok){
      return toast.error('Ocorreu um erro ao realizar a reserva!', {position: "bottom-center"});
    }

    const {sessionId} = await res.json();

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

    await stripe?.redirectToCheckout({sessionId});

    // router.push('/');
    return toast.success('Reserva realizada com sucesso!', {position: "bottom-center"});

  }

  const startDate = new Date(searchParams.get('startDate') as string);
  const endDate = new Date(searchParams.get('endDate') as string);
  const guests = searchParams.get('guests')

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-xl text-primaryDarker">Sua Viagem</h1>

      {/**CARD */}
      <div className="flex flex-col p-5 mt-5 border-grayLighther border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighther border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image src={trip.coverImage} alt={trip.name} style={{ objectFit: 'cover' }} fill className="rounded-lg" />
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg text-primaryDarker font-semibold">{trip.name}</h2>
            <div className='flex items-center gap-1'>
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className='text-xs text-grayPrimary underline'>{trip.location}</p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-lg text-primaryDarker mt-1">Inormações sobre o preço</h3>
        <div className="flex justify-between mt-2">
          <p className="font-semibold text-primaryDarker">Total:</p>
          <p>R$ {totalPrice}</p>
        </div>
      </div>
      {/**CARD */}

      <div className="flex flex-col mt-5 text-primaryDarker">
        <h3 className="font-semibold ">Data</h3>
        <div className="flex items-center gap-1 mt-1">
          <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
          {" - "}
          <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className="font-semibold mt-5">Hóspedes</h3>
        <p>{guests} hóspedes</p>

        <Button className="mt-5" onClick={handleBuyClick}>Finalizar Compra</Button>
      </div>
    </div>
  );
}

export default TripConfirmation;
