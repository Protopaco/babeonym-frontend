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
import type { LanguageWithRegions } from '@/api/generated';
import './LanguageFilterPicker.css';

type LanguageOption = {
  id: number;
  label: string;
  searchText: string;
};

type Props = {
  languages: LanguageWithRegions[];
  selectedLanguageIds: number[];
  onChange: (selectedLanguageIds: number[]) => void;
};

const buildLanguageOptions = (languages: LanguageWithRegions[]): LanguageOption[] =>
  languages.flatMap((continent) =>
    continent.regions.flatMap((region) =>
      region.languages.map((language) => ({
        id: language.id,
        label: language.label,
        searchText: `${language.label} ${region.label} ${continent.label}`.toLowerCase(),
      }))
    )
  );

const LanguageFilterPicker = ({ languages, selectedLanguageIds, onChange }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const languageOptions = useMemo(() => buildLanguageOptions(languages), [languages]);
  const selectedLanguageIdSet = useMemo(() => new Set(selectedLanguageIds), [selectedLanguageIds]);
  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const availableLanguageOptions = languageOptions.filter((languageOption) => !selectedLanguageIdSet.has(languageOption.id));
  const displayOptions = normalizedSearchValue
    ? availableLanguageOptions.filter((languageOption) => languageOption.searchText.includes(normalizedSearchValue))
    : availableLanguageOptions;
  const selectedLanguageOptions = languageOptions.filter((languageOption) => selectedLanguageIdSet.has(languageOption.id));

  const toggleLanguage = (languageId: number) => {
    if (selectedLanguageIdSet.has(languageId)) {
      onChange(selectedLanguageIds.filter((selectedLanguageId) => selectedLanguageId !== languageId));
      return;
    }

    onChange([...selectedLanguageIds, languageId]);
  };

  return (
    <div className="language-filter-picker">
      <TextField
        className="language-filter-picker-search"
        label="Search languages"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        size="small"
        slotProps={{
          input: {
            endAdornment: searchValue ? (
              <InputAdornment position="end">
                <IconButton
                  className="language-filter-picker-search-clear"
                  aria-label="Clear language search"
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
      <List className="language-filter-picker-options" aria-label="Language filter options">
        {displayOptions.map((languageOption) => (
          <ListItemButton
            className="language-filter-picker-option"
            key={languageOption.id}
            onClick={() => toggleLanguage(languageOption.id)}
          >
            <Checkbox
              className="language-filter-picker-checkbox"
              checked={selectedLanguageIdSet.has(languageOption.id)}
              tabIndex={-1}
            />
            <ListItemText primary={languageOption.label} />
          </ListItemButton>
        ))}
      </List>
      <div className="language-filter-picker-selected" aria-label="Selected language filters">
        <div className="language-filter-picker-selected-heading">
          <Typography className="language-filter-picker-selected-label">Selected</Typography>
          <Button
            className="language-filter-picker-clear"
            onClick={() => onChange([])}
            disabled={selectedLanguageIds.length === 0}
            size="small"
          >
            Clear All
          </Button>
        </div>
        <div className="language-filter-picker-selected-list">
          {selectedLanguageOptions.map((languageOption) => (
            <Chip
              className="language-filter-picker-selected-chip"
              key={languageOption.id}
              label={languageOption.label}
              onDelete={() => toggleLanguage(languageOption.id)}
              size="small"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageFilterPicker;
