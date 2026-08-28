import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import type { ReactNode } from 'react';
import FilterAccordionSummary from '@/components/NameGenerator/FilterAccordionSummary/FilterAccordionSummary';
import './FilterAccordionFrame.css';

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
    <Accordion className="filter-accordion-frame" expanded={expanded} onChange={onChange}>
      <FilterAccordionSummary label={label} ariaControls={ariaControls} id={id} />
      {expanded ? <AccordionDetails className="filter-accordion-frame-details">{children}</AccordionDetails> : null}
    </Accordion>
  );
};
