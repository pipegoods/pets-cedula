import { Pet } from '@prisma/client';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import QRCode from 'qrcode';

const MascotaId: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [qrCode, setQrCode] = useState<string>();

  useEffect(() => {
    const generateQrCode = () => {
      QRCode.toDataURL(
        'https://pets-cedula.vercel.app/' + id,
        {
          width: 900,
          margin: 3,
        },
        (err, url) => {
          if (err) return console.error(err);
          setQrCode(url);
        }
      );
    };

    generateQrCode();
  }, [id]);

  const { data } = useSWR<Pet>(id ? `/api/pets/${id || ''}` : null, {
    refreshInterval: 0,
  });

  if (!data) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <Image
          width={400}
          height={400}
          src={data.photo || ''}
          alt={data.name || ''}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data.name}</h2>
        <div className="flex-grow">
          <span>
            <span className="font-bold">Informacion de la mascota:</span>
          </span>
          <ul>
            <li>
              <span>Tispano de sangre: {data.bloodType}</span>
            </li>
            <li>
              <span>Raza: {data.breed}</span>
            </li>
            <li>
              <span>Edad: {data.age} años</span>
            </li>
          </ul>
        </div>

        <div className="card-actions justify-end">
          <a className="btn btn-primary" href={qrCode} download={`${id}.png`}>
            Descargar QR
          </a>
        </div>
      </div>
    </div>
  );
};

export default MascotaId;
