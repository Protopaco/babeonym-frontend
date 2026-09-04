import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import '@/components/Shared/BaseNameChip/BaseNameChip.css';

type Props = {
  children: ReactNode;
  size?: 'default' | 'large' | 'compare';
  interactive?: boolean;
};

// The pill a name sits in. It owns the box only — border, radius, background and
// dimensions — and publishes its text size as a custom property so the content
// can size itself without this component reaching into it.
const BaseNameChip = ({ children, size = 'default', interactive = false }: Props) => {
  return (
    <Box className="base-name-chip" data-size={size} data-interactive={interactive}>
      {children}
    </Box>
  );
};

export default BaseNameChip;
