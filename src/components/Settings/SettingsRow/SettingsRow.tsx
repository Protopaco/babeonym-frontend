import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import './SettingsRow.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  isReadOnly?: boolean;
  label: string;
  isDirty?: boolean;
  onSave?: () => void;
  errorMessage?: string | null;
  // The native cap, so the cursor does not jump when a caller's own handler
  // truncates the value. What the limit means is the caller's business.
  maxLength?: number;
  // Something to say about the value under the field, when there is no error to
  // say instead. The caller builds it; this only decides where it goes.
  suggestion?: ReactNode;
};

export default ({ value, onChange, isReadOnly = false, label, isDirty = false, onSave, errorMessage = null, maxLength, suggestion }: Props) => {
  // The error and the suggestion share one slot, so an error wins when both
  // exist — though a failed save leaves nothing to suggest anyway.
  const message = errorMessage ?? suggestion;

  // The message is rendered here rather than through the field's helperText
  // prop, which is the same FormHelperText placed inside the field's own box.
  // Inside, it makes the field taller than the save button beside it, and the
  // button drifts out of line the moment there is anything to say.
  return (
    <Box className="settings-row">
      <Box className="settings-row-controls">
        <TextField
          className="settings-row-field"
          value={value}
          label={label}
          error={errorMessage !== null}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && isDirty && onSave !== undefined) {
              onSave();
            }
          }}
          slotProps={{
            htmlInput: { maxLength },
            input: {
              readOnly: isReadOnly,
              endAdornment:
                value === '' ? null : (
                  <InputAdornment position="end">
                    <IconButton
                      className="settings-row-clear"
                      size="small"
                      aria-label={`Clear ${label}`}
                      onClick={() => {
                        onChange('');
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
            },
          }}
        />
        {onSave === undefined ? null : (
          <IconButton className="settings-row-save" aria-label={`Save ${label}`} disabled={!isDirty} onClick={onSave}>
            <SaveIcon />
          </IconButton>
        )}
      </Box>
      {message === undefined || message === null ? null : (
        <FormHelperText className="settings-row-message" error={errorMessage !== null}>
          {message}
        </FormHelperText>
      )}
    </Box>
  );
};
