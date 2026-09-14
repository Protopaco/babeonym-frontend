import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './SectionHeader.css';

type Props = {
  title: ReactNode;
  action?: ReactNode;
  width?: 'full' | 'medium';
  // Compact is a heading within a section — a modal's own sections, say — so it
  // keeps the underline but sits a step below the default.
  size?: 'default' | 'compact';
};

export default ({ title, action, width = 'full', size = 'default' }: Props) => {
  return (
    <Box className={`section-header section-header--${width} section-header--${size}`}>
      <Typography variant={size === 'compact' ? 'h6' : 'h4'} className="section-header-title">
        {title}
      </Typography>
      {action ? <Box className="section-header-action">{action}</Box> : null}
    </Box>
  );
};
