import type { LanguageRegion } from '@/api/generated';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import FilterListItem from '../../FilterListItem/FilterListItem';
import { useState, useEffect } from 'react';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { useFilters } from '@/state/filter/filter.context';
import type { LanguageWithRegions } from '@/api/generated';

type Props = {
  region: LanguageRegion;
};

export default (props: Props) => {
  const { id, label, languages } = props.region;
  const filterContext = useFilters();
  const givenNameContext = useGivenNames();
  const { selectedLanguageIds } = givenNameContext.state;
  const { addSelectedLanguageIds, removeSelectedLanguageIds } = useGivenNamesActions();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="language-continent-content" id="language-contient-summary">
        <Typography component="span">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
