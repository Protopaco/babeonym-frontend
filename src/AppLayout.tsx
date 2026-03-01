import { Outlet } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import type { BootState } from '@/types/BootState';
import Header from '@/pages/Header';
import bootUp from '@/app/bootUp';

const AppLayout = () => {
  const [boot, setBoot] = useState<BootState>({ status: 'loading' });
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    const run = async () => {
      const bootState = await bootUp();
      setBoot(bootState);
    };

    console.log('🚀 ~ AppLayout ~ booted.current:', booted.current);
    console.log('🚀 ~ AppLayout ~ boot:', boot);
    run();
  }, []);

  console.log('🚀 ~ AppLayout ~ booted:', booted);
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
