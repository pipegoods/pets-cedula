import { Pet } from '@prisma/client';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import useSWR from 'swr';

const PetsPage: NextPage = () => {
  const { data } = useSession();
  const { data: pets } = useSWR<Pet[]>(
    data ? `/api/owner/${data?.user?.id || ''}` : null,
    {
      refreshInterval: 0,
    }
  ); //TODO: Sacar el id del usuario desde servidor

  const havePets = pets && pets.length > 0;

  return (
    <>
      <h1 className="text-5xl font-bold mb-8">Mis mascotas</h1>

      {havePets ? (
        <ul className="flex justify-center gap-5">
          {pets.map((pet) => (
            <li key={pet.id} className="flex flex-col gap-1 justify-center">
              <Link
                href={{
                  pathname: '/mascota/[id]',
                  query: { id: pet.id },
                }}
              >
                <img
                  src={pet.photo || ''}
                  alt={pet.name || ''}
                  width={500}
                  height={500}
                  className="rounded-full cursor-pointer"
                />
              </Link>
              <p className="text-2xl font-bold">{pet.name}</p>
              <p className="text-xl">{pet.animal}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cargando tus mascotas...</p>
      )}
    </>
  );
};
export default PetsPage;
