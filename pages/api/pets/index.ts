import { Pet } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'config/lib/prisma';

type Data = Pet[] | Pet | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const METHOD = req.method;
  const pets = METHOD === 'GET' ? await getPets() : await savePet(req.body);

  res.status(200).json(pets);
}

const getPets = async (): Promise<Pet[]> => {
  const pets = await prisma.pet.findMany({
    include: {
      owner: true,
    },
  });

  return pets;
};

const savePet = async (pet: Pet): Promise<Pet> => {
  const newPet = await prisma.pet.create({
    data: pet,
  });

  return newPet;
};
