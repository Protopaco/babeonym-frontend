import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { themeOptions } from '@/themes/themeOptions';
import { useThemePicker } from '@/components/Settings/ThemePicker/useThemePicker';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './ThemePicker.css';

export default () => {
  const { activeThemeId, selectTheme } = useThemePicker();

  return (
    <Box className="theme-picker">
      {/* On the label rather than the swatches. There are four of them and a
          tooltip stays open on a coarse pointer, so hinting each would put four
          bubbles over one row. */}
      <TutorialTooltip title="Changes the color scheme" placement="right">
        <Typography variant="body2" className="theme-picker-label">
          Theme
        </Typography>
      </TutorialTooltip>
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
