import { prisma } from '@/lib/prisma';
import * as React from 'react';

const getTrips = async () => {
  const trips = await prisma.trip.findMany({});

  return trips;
}

const Trips = async () => {

  const data = await getTrips();

  console.log({data});

  return (
    <h1>Trips</h1>
  );
};

export default Trips;
