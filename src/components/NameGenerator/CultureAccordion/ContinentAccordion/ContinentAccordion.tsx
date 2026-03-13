import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import type { CultureWithRegions } from '@/api/generated';
import RegionAccordion from '@/components/NameGenerator/CultureAccordion/RegionAccordion/RegionAccordion';

type Props = {
  continent: CultureWithRegions;
};

export default (props: Props) => {
  const { label, regions } = props.continent;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="culture-continent-content" id="culture-contient-summary">
        <Typography component="span">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {regions.map((region, index) => {
            return <RegionAccordion key={index} region={region} />;
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
