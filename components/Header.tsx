import { signIn, signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';

const Header = () => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <header className="navbar bg-base-100 fixed z-10">
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">Pets Cedula</a>
        </Link>
      </div>
      <div className="flex-none gap-5">
        <Button onClick={() => setTheme(theme === 'dark' ? 'cupcake' : 'dark')}>
          {theme}
        </Button>
        {session ? (
          <div className="flex items-center">
            <p className="capitalize mr-2">
              Hola,{' '}
              <span className="font-bold">
                {session.user?.name?.slice(0, 10)}
              </span>
            </p>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    src={
                      session.user?.image ||
                      'https://api.lorem.space/image/face?hash=33791'
                    }
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Perfil
                    <span className="badge">Nuevo</span>
                  </a>
                </li>
                <li>
                  <a>Configuracion</a>
                </li>
                <li onClick={() => signOut()}>
                  <a>Cerrar sesion</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="tooltip tooltip-left" data-tip="Iniciar con Google">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={() => signIn('google')}
            >
              <div className="w-10 rounded-full">
                <Image
                  src="/svg/google.svg"
                  alt="avatar"
                  width={40}
                  height={40}
                />
              </div>
            </label>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
