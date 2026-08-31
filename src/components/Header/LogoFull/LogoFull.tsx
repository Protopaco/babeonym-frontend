import LogoFull from '@/assets/icons/icon-full.svg?react';
import type { MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@/components/Header/LogoFull/LogoFull.css';

export default () => {
  const location = useLocation();

  const preventRootNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      event.preventDefault();
    }
  };

  return (
    <Link id="logo-home-link" to="/" aria-label="Go to Babeonym home" onClick={preventRootNavigation}>
      <LogoFull id="logo-full" />
    </Link>
  );
};
