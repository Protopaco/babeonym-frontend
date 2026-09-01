import type { ReactNode } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './SettingsRow.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  isReadOnly?: boolean;
  label: string;
};

export default ({ value, onChange, isReadOnly = false, label }: Props) => {
  return (
    <Box className="settings-row">
      <TextField
        className="settings-row-field"
        value={value}
        label={label}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        slotProps={{ input: { readOnly: isReadOnly } }}
      />
    </Box>
  );
};
