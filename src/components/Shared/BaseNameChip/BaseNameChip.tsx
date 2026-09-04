import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import '@/components/Shared/BaseNameChip/BaseNameChip.css';

type Props = {
  children: ReactNode;
  size?: 'default' | 'large' | 'compare';
  shape?: 'name' | 'action';
  interactive?: boolean;
  state?: 'default' | 'invalid' | 'saving';
};

// The pill a name sits in. It owns the box only — border, radius, background and
// dimensions — and publishes its text size as a custom property so the content
// can size itself without this component reaching into it. Size sets everything
// but width; shape sets width alone, so an action can be the same pill in
// shorter form.
const BaseNameChip = ({ children, size = 'default', shape = 'name', interactive = false, state = 'default' }: Props) => {
  return (
    <Box className="base-name-chip" data-size={size} data-shape={shape} data-interactive={interactive} data-state={state}>
      {children}
    </Box>
  );
};

export default BaseNameChip;
