import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './SectionHeader.css';

type Props = {
  title: ReactNode;
  action?: ReactNode;
  width?: 'full' | 'medium';
};

export default ({ title, action, width = 'full' }: Props) => {
  return (
    <Box className={`section-header section-header--${width}`}>
      <Typography variant="h4" className="section-header-title">
        {title}
      </Typography>
      {action ? <Box className="section-header-action">{action}</Box> : null}
    </Box>
  );
};
