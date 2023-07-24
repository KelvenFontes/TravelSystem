import Image from "next/image";
import { Prisma, TripReservation } from "@prisma/client";
import ReactCountryFlag from "react-country-flag";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true }
  }>
}

const UserReservationItem = ({ reservation }: UserReservationItemProps) => {

  const router = useRouter();

  const { trip } = reservation;

  const handleDeleteClick = async () => {
    const res = await fetch(`http://localhost:3000/api/trips/reservation/${reservation.id}`, {
      method: 'DELETE',
    });

    if(!res.ok){
      return toast.error('Ocorreu um erro ao cancelar sua reserva!', {position: 'bottom-center'});
    }

    toast.success('Reserva cancela com sucesso!', {position: 'bottom-center'});

    router.refresh();
  };

  return (
    <div>
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

        <div className="flex flex-col mt-5 text-primaryDarker">
          <h3 className="text-sm font-medium">Data</h3>
          <div className="flex items-center gap-1">
            <p className="text-sm">{format(new Date(reservation.startDate), "dd 'de' MMMM", { locale: ptBR })}</p>
            {" - "}
            <p className="text-sm">{format(new Date(reservation.endDate), "dd 'de' MMMM", { locale: ptBR })}</p>
          </div>

          <h3 className="text-sm font-medium mt-5">Hóspedes</h3>
          <p className="text-sm pb-5">{reservation.guests} hóspedes</p>

          <h3 className="font-medium text-sm text-primaryDarker mt-1 pt-5 border-t border-solid border-grayLighther">Inormações sobre o preço</h3>
          <div className="flex justify-between mt-1">
            <p className="text-primaryDarker text-sm">Total:</p>
            <p className="text-sm">R$ {Number(reservation.totalPaid)}</p>
          </div>

          <Button className="mt-5" variant="danger" onClick={handleDeleteClick}>Cancelar</Button>

        </div>

      </div>
      {/**CARD */}

    </div>
  );
};

export default UserReservationItem;
