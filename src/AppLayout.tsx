import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { BootState } from '@/types/BootState';
import Header from '@/pages/Header';
import getBootState from '@/app/getBootState';

const AppLayout = () => {
  const [boot, setBoot] = useState<BootState>({ status: 'loading' });

  useEffect(() => {
    const run = async () => {
      const bootState = await getBootState();
      setBoot(bootState);
    };

    run();
  }, []);

  if (boot.status === 'loading') return <div>Loading…</div>;
  if (boot.status === 'error') return <div>{boot.message}</div>;

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
