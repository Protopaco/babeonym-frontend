import type { CultureRegion } from '@/api/generated';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import FilterListItem from '../../FilterListItem/FilterListItem';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';

type Props = {
  region: CultureRegion;
};

export default (props: Props) => {
  const { label, cultures } = props.region;
  const givenNameContext = useGivenNames();
  const { selectedCultureIds } = givenNameContext.state;
  const { addSelectedCultureIds, removeSelectedCultureIds } = useGivenNamesActions();

  const anySelected = cultures.some(({ id }) => selectedCultureIds.includes(id));

  const selectAll = () => {
    const currentUnselectedCultureIds = cultures.filter(({ id }) => !selectedCultureIds.includes(id)).map(({ id }) => id);
    addSelectedCultureIds(currentUnselectedCultureIds);
  };

  const unselectAll = () => {
    const currentSelectedCultureIds = cultures.filter(({ id }) => selectedCultureIds.includes(id)).map(({ id }) => id);
    removeSelectedCultureIds(currentSelectedCultureIds);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="culture-continent-content" id="culture-contient-summary">
        <Typography component="span">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {anySelected ? <SecondaryButton text="Unselect All" onClick={unselectAll} /> : <SecondaryButton text="Select All" onClick={selectAll} />}
        <List>
          {cultures.map((culture, index) => {
            const { id, label } = culture;
            const selected = selectedCultureIds.includes(id);

            return (
              <FilterListItem
                key={index}
                index={index}
                label={label}
                action={
                  selected
                    ? () => {
                        removeSelectedCultureIds([id]);
                      }
                    : () => {
                        addSelectedCultureIds([id]);
                      }
                }
                selected={selected}
              />
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
