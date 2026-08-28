import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import type { CultureWithRegions } from '@/api/generated';
import RegionAccordion from '@/components/NameGenerator/CultureAccordion/RegionAccordion/RegionAccordion';
import { useState } from 'react';
import './ContinentAccordion.css';

type Props = {
  continent: CultureWithRegions;
};

export default (props: Props) => {
  const { label, regions } = props.continent;
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion expanded={expanded} onChange={(_event, isExpanded) => setExpanded(isExpanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="culture-continent-content" id="culture-contient-summary">
        <Typography component="span">{label}</Typography>
      </AccordionSummary>
      {expanded ? (
        <AccordionDetails>
          <List>
            {regions.map((region) => {
              return <RegionAccordion key={region.id} region={region} />;
            })}
          </List>
        </AccordionDetails>
      ) : null}
    </Accordion>
  );
};
