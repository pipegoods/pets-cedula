import type { NextPage } from 'next';
import { useTheme } from 'next-themes';

const Home: NextPage = () => {
  const { setTheme } = useTheme();

  return (
    <div>
      <button className="btn" onClick={() => setTheme('cupcake')}>
        cupcake
      </button>
      <button className="btn" onClick={() => setTheme('dark')}>
        dark
      </button>
    </div>
  );
};

export default Home;
