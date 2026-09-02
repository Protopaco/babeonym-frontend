import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { themeOptions } from '@/themes/themeOptions';
import { useThemePicker } from '@/components/Settings/ThemePicker/useThemePicker';
import './ThemePicker.css';

export default () => {
  const { activeThemeId, selectTheme } = useThemePicker();

  return (
    <Box className="theme-picker">
      <Typography variant="body2" className="theme-picker-label">
        Theme
      </Typography>
      <Box className="theme-picker-swatches">
        {themeOptions.map(({ id, label }) => (
          <IconButton
            key={id}
            className="theme-picker-swatch"
            data-theme-id={id}
            data-active={id === activeThemeId}
            aria-label={label}
            aria-pressed={id === activeThemeId}
            onClick={() => {
              selectTheme(id);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
