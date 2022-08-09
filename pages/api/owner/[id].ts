// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Pet } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'config/lib/prisma';

type Data = Pet[] | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  const pet = await prisma.pet.findMany({
    where: {
      ownerId: id as string,
    },
  });

  res.status(200).json(pet);
}
