'use client'

import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { differenceInDays } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';

interface TripReservationProps {
  tripSartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
}

interface TripReservationForm {
  tripId: string;
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({ maxGuests, tripSartDate, tripEndDate, pricePerDay }: TripReservationProps) => {

  const { register, handleSubmit, formState: { errors }, control, watch } = useForm<TripReservationForm>();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch('http://localhost:3000/api/trips/check', {
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId: data.tripId,
        }),
      ),
    });

    const res = await response.json();

    console.log(res);
  };

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  return (
    <div className='flex flex-col px-5'>
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
        })}
        placeholder={`Número de hóspedes (máx: ${maxGuests})`}
        className='mt-4'
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
      />

      <div className='flex justify-between mt-3'>
        <p className='font-medium text-sm text-primaryDarker'>Total:</p>
        <p className='font-medium text-sm text-primaryDarker'>
          {startDate && endDate ? `R$ ${differenceInDays(endDate, startDate) * pricePerDay}` : 'R$ 0,00'}
        </p>
      </div>

      <div className='pb-10 border-b border-b-grayLighther w-full'>
        <Button className='mt-3 w-full' onClick={() => handleSubmit(onSubmit)()}>Reservar agora</Button>
      </div>

    </div>
  );
};

export default TripReservation;
