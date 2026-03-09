import { Gender, GenderValues } from '@/types/Gender';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';

export default () => {
  const givenNameContext = useGivenNames();
  const { selectedGenders } = givenNameContext.state;
  const { addSelectedGenders, removeSelectedGenders } = useGivenNamesActions();

  const handleChange = async (updatedGenders: string[]) => {
    const addedGenders = updatedGenders.filter((gender) => !selectedGenders.includes(gender as Gender));
    await addSelectedGenders(addedGenders as Gender[]);

    const removedGenders = selectedGenders.filter((gender) => !updatedGenders.includes(gender));
    await removeSelectedGenders(removedGenders);
  };

  return (
    <Autocomplete
      multiple
      id="decades-filter"
      options={GenderValues}
      disableCloseOnSelect
      onChange={async (event, value) => {
        await handleChange(value);
      }}
      getOptionLabel={(option: Gender) => option}
      renderInput={(params) => <TextField {...params} label="Genders" placeholder="Favorites" />}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

        return (
          <li key={key} {...optionProps}>
            <SelectionIcon fontSize="small" style={{ marginRight: 8, padding: 9, boxSizing: 'content-box' }} />
            {option}
          </li>
        );
      }}
    />
  );
};
