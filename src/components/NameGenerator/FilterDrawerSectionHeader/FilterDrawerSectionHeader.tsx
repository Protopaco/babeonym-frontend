import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './FilterDrawerSectionHeader.css';

type Props = {
  title: string;
  action?: ReactNode;
};

export default ({ title, action }: Props) => {
  return (
    <Box className="filter-drawer-section-header">
      <Typography variant="h4" className="filter-drawer-section-title">
        {title}
      </Typography>
      <Box className="filter-drawer-section-action">{action}</Box>
    </Box>
  );
};
