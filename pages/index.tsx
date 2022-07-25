import type { NextPage } from 'next';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div className="hero min-h-screen bg-base-300">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Pets Cedula</h1>
          <p className="py-6">
            Crear una identificacion para tus mascotas y poder controlarlas
            desde cualquier lugar.
          </p>
          <button className="btn btn-primary gap-2">
            <Image src="/svg/qr-code.svg" alt="qr" width={18} height={18} />
            crear QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
