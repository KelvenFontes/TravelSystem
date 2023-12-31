'use client'

import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { differenceInDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

interface TripReservationProps {
  tripSartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
  tripId: string;
}

interface TripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({ tripId, maxGuests, tripSartDate, tripEndDate, pricePerDay }: TripReservationProps) => {

  const { register, handleSubmit, formState: { errors }, control, watch, setError } = useForm<TripReservationForm>();

  const router = useRouter();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch('/api/trips/check', {
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId,
        }),
      ),
    });

    const res = await response.json();

    if (res?.error?.code === 'TRIP_ALREADY_RESERVED') {
      setError('startDate', {
        type: 'manual',
        message: 'Esta data já está reservada.',
      });

      return setError('endDate', {
        type: 'manual',
        message: 'Esta data já está reservada.',
      });
    }

    if (res?.error?.code === 'INVALID_START_DATE') {
      return setError('startDate', {
        type: 'manual',
        message: 'Data inválida',
      });
    }

    if (res?.error?.code === 'INVALID_END_DATE') {
      return setError('endDate', {
        type: 'manual',
        message: 'Data inválida',
      });
    }

    router.push(`/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${data.guests}`);

  };

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  return (
    <div className='flex flex-col px-5 lg:min-w-[380px] lg:border-grayLighther lg:border lg:rounded-lg lg:shadow-md'>

      <p className="hidden text-xl text-primaryDarker mb-3 mt-2 lg:block">
        <span className="font-semibold">R${pricePerDay}</span> por dia
      </p>

      <div className='flex gap-4'>
        <Controller
          name='startDate'
          rules={{
            required: {
              value: true,
              message: 'Data inicial é obrigatória!'
            }
          }}
          control={control}
          render={({ field }) =>
            <DatePicker
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              placeholderText='Data de Início'
              onChange={field.onChange}
              selected={field.value}
              className='w-full'
              minDate={tripSartDate}
            />}
        />

        <Controller
          name='endDate'
          rules={{
            required: {
              value: true,
              message: 'Data Final é obrigatória!'
            }
          }}
          control={control}
          render={({ field }) =>
            <DatePicker
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              placeholderText='Data Final'
              onChange={field.onChange}
              selected={field.value}
              className='w-full'
              maxDate={tripEndDate}
              minDate={startDate ?? tripSartDate}
            />}
        />
      </div>

      <Input
        {...register(
          'guests', {
          required: {
            value: true,
            message: 'Número de hóspedes é obrigatório.'
          },
          max: {
            value: maxGuests,
            message: `Número de hóspedes não pode ser maior que ${maxGuests}.`,
          },
        })}
        placeholder={`Número de hóspedes (máx: ${maxGuests})`}
        className='mt-4'
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        type='number'
      />

      <div className='flex justify-between mt-3'>
        <p className='font-medium text-sm text-primaryDarker'>Total:</p>
        <p className='font-medium text-sm text-primaryDarker'>
          {startDate && endDate ? `R$ ${differenceInDays(endDate, startDate) * pricePerDay}` : 'R$ 0,00'}
        </p>
      </div>

      <div className='pb-10 border-b border-b-grayLighther w-full lg:border-none lg:pb-5'>
        <Button className='mt-3 w-full' onClick={() => handleSubmit(onSubmit)()}>Reservar agora</Button>
      </div>

    </div>
  );
};

export default TripReservation;
