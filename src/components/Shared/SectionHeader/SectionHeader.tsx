import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HorizontalRule from '@/components/Shared/HorizontalRule/HorizontalRule';
import './SectionHeader.css';

type Props = {
  title: ReactNode;
  // Compact is a heading within a section — a modal's own sections, say — so it
  // keeps the rule but sits a step below the default.
  size?: 'default' | 'compact';
};

export default ({ title, size = 'default' }: Props) => {
  return (
    <Box className={`section-header section-header--${size}`}>
      <Typography variant={size === 'compact' ? 'h6' : 'h4'} className="section-header-title">
        {title}
      </Typography>
      <div className="section-header-rule">
        <HorizontalRule />
      </div>
    </Box>
  );
};
