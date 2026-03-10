import { Gender, GenderValues } from '@/types/Gender';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
//import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default () => {
  const givenNameContext = useGivenNames();
  const { selectedGenders } = givenNameContext.state;
  console.log('🚀 ~ selectedGenders:', selectedGenders);
  const { addSelectedGenders, removeSelectedGenders } = useGivenNamesActions();

  const handleChange = async (updatedGenders: string[]) => {
    console.log('🚀 ~ handleChange ~ updatedGenders:', updatedGenders);
    const addedGenders = updatedGenders.filter((gender) => !selectedGenders.includes(gender as Gender));
    console.log('🚀 ~ handleChange ~ addedGenders:', addedGenders);
    await addSelectedGenders(addedGenders as Gender[]);

    const removedGenders = selectedGenders.filter((gender) => !updatedGenders.includes(gender));
    console.log('🚀 ~ handleChange ~ removedGenders:', removedGenders);
    await removeSelectedGenders(removedGenders);
  };

  const FilterOptions = (index: number, label: String, action: any, selected: boolean) => {
    console.log('🚀 ~ FilterOptions ~ index:', index);
    return (
      <FormGroup key={index} onClick={action}>
        <FormControlLabel control={<Checkbox checked={selected} />} label={label} />
      </FormGroup>
    );
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="gender-filter-content" id="gender-filter-summary">
        <Typography component="span">Gender</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {GenderValues.map((gender, index) => {
          const selected = selectedGenders.includes(gender);

          return FilterOptions(
            index,
            gender,
            selected
              ? () => {
                  addSelectedGenders([gender]);
                }
              : () => {
                  removeSelectedGenders([gender]);
                },
            selected
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
