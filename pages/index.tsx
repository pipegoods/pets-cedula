import { Button } from '@components/Button';
import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = () => {
  const { status } = useSession();

  const isAuthenticated = status === 'authenticated';

  return (
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Pets Cedula</h1>
      <p className="py-6">
        Crear una identificacion para tus mascotas y poder controlarlas desde
        cualquier lugar.
      </p>

      <div className="flex gap-2 justify-center">
        {isAuthenticated ? (
          <>
            <Link href="mascota/create">
              <Button onClick={() => []} className="gap-2">
                <Image src="/svg/qr-code.svg" alt="qr" width={18} height={18} />
                crear QR
              </Button>
            </Link>
            <Link href="mascota">
              <a className="btn btn-success gap-2">
                <Image
                  src="/images/mascotas.png"
                  alt="mascotas"
                  width={18}
                  height={18}
                />
                Ver mis mascotas
              </a>
            </Link>
          </>
        ) : (
          <Button onClick={() => signIn('google')} buttonType="secondary">
            Iniciar sesion con Google
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
