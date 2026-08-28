import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './FilterAccordionSummary.css';

type Props = {
  label: string;
  ariaControls: string;
  id: string;
};

export default ({ label, ariaControls, id }: Props) => {
  return (
    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={ariaControls} id={id}>
      <Typography component="span" variant="h6">
        {label}
      </Typography>
    </AccordionSummary>
  );
};
