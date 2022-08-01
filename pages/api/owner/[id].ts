// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Pet } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'config/lib/prisma';

type Data = Pet[] | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { ownerId } = req.query;
  const pet = await prisma.pet.findMany({
    where: {
      ownerId: ownerId as string,
    },
  });

  res.status(200).json(pet);
}
