import Header from '@components/Header';
import type { MainLayoutProps } from 'types/MainLayout.type';

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="hero min-h-screen bg-base-300">
        <div className="hero-content text-center">
          <div className="max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
