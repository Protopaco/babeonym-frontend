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
import { useState } from 'react';

type Props = {
  region: LanguageRegion;
};

export default (props: Props) => {
  const { label, languages } = props.region;
  const [expanded, setExpanded] = useState(false);
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
    <Accordion expanded={expanded} onChange={(_event, isExpanded) => setExpanded(isExpanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="language-continent-content" id="language-contient-summary">
        <Typography component="span">{label}</Typography>
      </AccordionSummary>
      {expanded ? (
        <AccordionDetails>
          {anySelected ? <SecondaryButton text="Unselect All" onClick={unselectAll} /> : <SecondaryButton text="Select All" onClick={selectAll} />}
          <List>
            {languages.map((language, index) => {
              const { id, label, flag } = language;
              const selected = selectedLanguageIds.includes(id);

              return (
                <FilterListItem
                  key={id}
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
      ) : null}
    </Accordion>
  );
};
