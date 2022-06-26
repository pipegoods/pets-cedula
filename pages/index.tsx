import type { NextPage } from "next";
import { useTheme } from "next-themes";

const Home: NextPage = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  console.log({ systemTheme, theme });

  return (
    <div>
          <button className="btn" onClick={() => setTheme("cupcake")}>cupcake</button>
          <button className="btn" onClick={() => setTheme("dark")}>dark</button>

    </div>
  );
};

export default Home;
