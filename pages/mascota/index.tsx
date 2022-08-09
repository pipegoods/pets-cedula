import { Button } from '@components/Button';
import { Pet } from '@prisma/client';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const PetsPage: NextPage = () => {
  const { data } = useSession();
  const router = useRouter();
  const { data: pets } = useSWR<Pet[]>(
    data ? `/api/owner/${data?.user?.id || ''}` : null,
    {
      refreshInterval: 0,
    }
  );

  const havePets = pets && pets.length > 0;

  const redirectToCreatePet = () => {
    router.push('/mascota/create');
  };

  return (
    <div className="max-w-md">
      <h1 className="text-5xl font-bold mb-8">Mis mascotas</h1>
      <Button onClick={redirectToCreatePet}>Nueva mascota</Button>

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
                <Image
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
    </div>
  );
};
export default PetsPage;
