import Header from '@components/Header';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import type { MainLayoutProps } from 'types/MainLayout';

const MainLayout = ({ children }: MainLayoutProps) => {
  const { status } = useSession();

  if (status === 'loading') {
    return <>Cargando app...</>; // TODO: colocarle un loading lindo a esto
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
