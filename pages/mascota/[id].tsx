import { Pet } from '@prisma/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const MascotaId: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR<Pet>(id ? `/api/pets/${id || ''}` : null, {
    refreshInterval: 0,
  });

  if (!data) {
    return <p>Cargando...</p>;
  }

  return (
    <article className="flex flex-col flex-wrap">
      <div className="hero-content text-center flex-col">
        <img
          src={data.photo || ''}
          alt={data.name || ''}
          width={300}
          height={300}
          className="rounded-full"
        />

        <h1 className="text-5xl font-bold mb-8">{data.name}</h1>
        <p className="text-lg">{data.breed}</p>
        <p className="text-lg">🩸 {data.bloodType}</p>
        <p className="text-lg">{data.age} años</p>
        <p className="text-lg">{data.animal}</p>
      </div>
    </article>
  );
};

export default MascotaId;
