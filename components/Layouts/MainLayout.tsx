import Header from '@components/Header';
import { useSession } from 'next-auth/react';
import type { MainLayoutProps } from 'types/MainLayout';

const MainLayout = ({ children }: MainLayoutProps) => {
  const { status } = useSession();

  if (status === 'loading') {
    return <>Cargando app...</>; // TODO: colocarle un loading lindo a esto
  }

  return (
    <div className="main-layout">
      <Header />
      <div className="hero min-h-screen bg-base-300">
        <div className="hero-content text-center">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
