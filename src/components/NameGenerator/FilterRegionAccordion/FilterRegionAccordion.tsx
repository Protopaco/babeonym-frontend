import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import './FilterRegionAccordion.css';

type Props = {
  ariaControls: string;
  children: ReactNode;
  expanded: boolean;
  id: string;
  label: string;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

export default ({ ariaControls, children, expanded, id, label, onChange }: Props) => {
  return (
    <Accordion className="filter-region-accordion" expanded={expanded} onChange={onChange}>
      <AccordionSummary className="filter-region-accordion-summary" expandIcon={<ExpandMoreIcon />} aria-controls={ariaControls} id={id}>
        <Typography component="span">{label}</Typography>
      </AccordionSummary>
      {expanded ? <AccordionDetails className="filter-region-accordion-details">{children}</AccordionDetails> : null}
    </Accordion>
  );
};
