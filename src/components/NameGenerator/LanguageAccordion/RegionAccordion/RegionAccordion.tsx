import type { LanguageRegion } from '@/api/generated';
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
  region: LanguageRegion;
};

export default (props: Props) => {
  const { label, languages } = props.region;
  const givenNameContext = useGivenNames();
  const { selectedLanguageIds } = givenNameContext.state;
  const { addSelectedLanguageIds, removeSelectedLanguageIds } = useGivenNamesActions();

  const anySelected = languages.some(({ id }) => selectedLanguageIds.includes(id));

  const selectAll = () => {
    const currentUnselectedLanguageIds = languages.filter(({ id }) => !selectedLanguageIds.includes(id)).map(({ id }) => id);
    addSelectedLanguageIds(currentUnselectedLanguageIds);
  };

  const unselectAll = () => {
    const currentSelectedLanguageIds = languages.filter(({ id }) => selectedLanguageIds.includes(id)).map(({ id }) => id);
    removeSelectedLanguageIds(currentSelectedLanguageIds);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="language-continent-content" id="language-contient-summary">
        <Typography component="span">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {anySelected ? <SecondaryButton text="Unselect All" onClick={unselectAll} /> : <SecondaryButton text="Select All" onClick={selectAll} />}
        <List>
          {languages.map((language, index) => {
            const { id, label, flag } = language;
            let selected = selectedLanguageIds.includes(id);

            return (
              <FilterListItem
                key={index}
                index={index}
                label={`${label} ${flag}`}
                action={
                  selected
                    ? () => {
                        removeSelectedLanguageIds([id]);
                      }
                    : () => {
                        addSelectedLanguageIds([id]);
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
