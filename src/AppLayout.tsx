import { Outlet } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import type { BootState } from '@/types/BootState';
//import { useUser } from '@/state/user/user.context';
import Header from '@/pages/Header';
import bootUp from '@/app/bootUp';

const AppLayout = () => {
  //const { setUser } = useUser();

  // const [boot, setBoot] = useState<BootState>({ status: 'loading' });
  // const booted = useRef(false);

  // useEffect(() => {
  //   const run = async () => {
  //     const bootState = await bootUp();
  //     setBoot(bootState);
  //     if (bootState.status === 'ready') setUser(bootState.user);
  //   };

  //   if (booted.current) return;
  //   booted.current = true;
  //   run();
  // }, []);

  // if (boot.status === 'loading') return <div>Loading…</div>;
  // if (boot.status === 'error') return <div>Error</div>;

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
