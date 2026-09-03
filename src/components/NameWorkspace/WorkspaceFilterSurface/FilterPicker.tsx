import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import type { FilterPickerOption } from '@/models/FilterPickerOption';
import './FilterPicker.css';

type Props = {
  ariaLabel: string;
  options: FilterPickerOption[];
  searchLabel?: string;
  searchable?: boolean;
  selectedOptionIds: number[];
  onChange: (selectedOptionIds: number[]) => void;
};

const FilterPicker = ({ ariaLabel, options, searchLabel, searchable = true, selectedOptionIds, onChange }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const selectedOptionIdSet = useMemo(() => new Set(selectedOptionIds), [selectedOptionIds]);
  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const availableOptions = options.filter((option) => !selectedOptionIdSet.has(option.id));
  const displayOptions =
    searchable && normalizedSearchValue
      ? availableOptions.filter((option) => option.searchText.includes(normalizedSearchValue))
      : availableOptions;
  const selectedOptions = options.filter((option) => selectedOptionIdSet.has(option.id));

  const toggleOption = (optionId: number) => {
    onChange(
      selectedOptionIdSet.has(optionId)
        ? selectedOptionIds.filter((selectedOptionId) => selectedOptionId !== optionId)
        : [...selectedOptionIds, optionId]
    );
  };

  return (
    <div className="filter-picker" data-searchable={searchable}>
      {searchable && (
        <TextField
          className="filter-picker-search"
          label={searchLabel}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          size="small"
          slotProps={{
            input: {
              endAdornment: searchValue ? (
                <InputAdornment position="end">
                  <IconButton
                    className="filter-picker-search-clear"
                    aria-label={`Clear ${searchLabel}`}
                    onClick={() => setSearchValue('')}
                    edge="end"
                    size="small"
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            },
          }}
        />
      )}
      <List className="filter-picker-options themed-scrollbar" aria-label={ariaLabel}>
        {displayOptions.map((option) => (
          <ListItemButton className="filter-picker-option" key={option.id} onClick={() => toggleOption(option.id)}>
            <Checkbox className="filter-picker-checkbox" checked={selectedOptionIdSet.has(option.id)} tabIndex={-1} />
            <ListItemText primary={option.label} />
          </ListItemButton>
        ))}
      </List>
      <div className="filter-picker-selected" aria-label="Selected filters">
        <div className="filter-picker-selected-heading">
          <Typography className="filter-picker-selected-label">Selected</Typography>
          <Button className="filter-picker-clear" onClick={() => onChange([])} disabled={selectedOptionIds.length === 0} size="small">
            Clear All
          </Button>
        </div>
        <div className="filter-picker-selected-list themed-scrollbar">
          {selectedOptions.map((option) => (
            <Chip className="filter-picker-selected-chip" key={option.id} label={option.label} onDelete={() => toggleOption(option.id)} size="small" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPicker;
