import { Pet } from '@prisma/client';

export const createPet = async (pet: Omit<Pet, 'id'>) => {
  return await fetch('/api/pets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pet),
  });
};
