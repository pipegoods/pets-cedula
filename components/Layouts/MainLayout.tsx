import Header from '@components/Header';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Lottie from 'react-lottie-player';
import type { MainLayoutProps } from 'types/MainLayout';
import lottieCat from '../../config/data/loanding-cat.json';

const MainLayout = ({ children }: MainLayoutProps) => {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <div className="grid place-content-center min-h-screen">
        <Lottie
          loop
          animationData={lottieCat}
          play
          style={{ width: 150, height: 150 }}
        />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Pets Cedula</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="main-layout">
        <Header />
        <div className="hero min-h-screen bg-base-300">
          <div className="hero-content text-center">{children}</div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
