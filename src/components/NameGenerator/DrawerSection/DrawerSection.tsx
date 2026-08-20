import type { ReactNode } from 'react';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import './DrawerSection.css';

type Props = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export default ({ title, action, children, footer }: Props) => {
  return (
    <section className="drawer-section">
      <SectionHeader title={title} action={action} />
      <div className="drawer-section-body">{children}</div>
      {footer ? <div className="drawer-section-footer">{footer}</div> : null}
    </section>
  );
};
