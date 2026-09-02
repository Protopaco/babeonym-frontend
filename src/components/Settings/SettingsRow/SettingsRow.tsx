import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
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
};

export default ({ value, onChange, isReadOnly = false, label, isDirty = false, onSave, errorMessage = null }: Props) => {
  return (
    <Box className="settings-row">
      <TextField
        className="settings-row-field"
        value={value}
        label={label}
        error={errorMessage !== null}
        helperText={errorMessage ?? undefined}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && isDirty && onSave !== undefined) {
            onSave();
          }
        }}
        slotProps={{
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
  );
};
