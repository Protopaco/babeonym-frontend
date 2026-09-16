import CancelIcon from '@mui/icons-material/Cancel';
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
    searchable && normalizedSearchValue ? availableOptions.filter((option) => option.searchText.includes(normalizedSearchValue)) : availableOptions;
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
      {/* The box and the thing that scrolls are separate elements on purpose.
          The box carries the border, the radius and the fill; the child inside
          it does the scrolling, so its scrollbar sits in from the border box and
          never reaches the rounded corners to be clipped by them. Doing it this
          way rather than by styling the scrollbar is what makes Firefox behave
          like the others, since ::-webkit-scrollbar does nothing there. */}
      <div className="filter-picker-options">
        <List className="filter-picker-options-list themed-scrollbar" aria-label={ariaLabel}>
          {displayOptions.map((option) => (
            <ListItemButton className="filter-picker-option" key={option.id} onClick={() => toggleOption(option.id)}>
              <ListItemText primary={option.label} />
            </ListItemButton>
          ))}
        </List>
      </div>
      {/* The word sits inside the box as a placeholder rather than above it as a
          heading. As a heading it needed a row of its own on the frame, and that
          row was a band of primary across the middle of every column — heavier
          than the 6px the frame shows anywhere else. */}
      <div className="filter-picker-selected">
        <div className="filter-picker-selected-list themed-scrollbar" aria-label="Selected filters">
          {selectedOptions.length === 0 ? (
            <Typography className="filter-picker-selected-placeholder">Selected</Typography>
          ) : (
            selectedOptions.map((option) => (
              <Chip
                className="filter-picker-selected-chip"
                key={option.id}
                label={option.label}
                onDelete={() => toggleOption(option.id)}
                size="small"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPicker;
