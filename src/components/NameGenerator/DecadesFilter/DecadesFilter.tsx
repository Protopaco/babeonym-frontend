import type { Decade } from '@/api/generated/models/Decade';
import { useFilters } from '@/state/filter/filter.context';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default () => {
  const filterContext = useFilters();
  const { decades } = filterContext.state;
  const givenNameContext = useGivenNames();
  const { selectedDecadeIds } = givenNameContext.state;
  const { addSelectedDecadeId, removeSelectedDecadeId } = useGivenNamesActions();

  const addDecadeId = async (selectedDecadeId: number) => {
    await addSelectedDecadeId(selectedDecadeId);
  };

  const removeDecadeId = async (unselectedDecadeId: number) => {
    await removeSelectedDecadeId(unselectedDecadeId);
  };
  return (
    <Autocomplete
      multiple
      id="decades-filter"
      options={decades}
      disableCloseOnSelect
      getOptionLabel={(option: Decade) => option.label}
      renderInput={(params) => <TextField {...params} label="Checkboxes" placeholder="Favorites" />}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

        return (
          <li key={key} {...optionProps}>
            <SelectionIcon fontSize="small" style={{ marginRight: 8, padding: 9, boxSizing: 'content-box' }} />
            {option.label}
          </li>
        );
      }}
    />
  );
};
