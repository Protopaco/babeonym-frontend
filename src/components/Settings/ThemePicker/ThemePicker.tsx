import { useId } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { themeOptions } from '@/themes/themeOptions';
import { useThemePicker } from '@/components/Settings/ThemePicker/useThemePicker';
import ThemeChip from '@/components/Settings/ThemePicker/ThemeChip/ThemeChip';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './ThemePicker.css';

export default () => {
  const { activeThemeId, selectTheme } = useThemePicker();
  const labelId = useId();

  return (
    <Box className="theme-picker">
      {/* On the label rather than the chips. There are four of them and a
          tooltip stays open on a coarse pointer, so hinting each would put four
          bubbles over one row. */}
      <TutorialTooltip title="Changes the color scheme" placement="right">
        <Typography id={labelId} variant="body1" className="theme-picker-label">
          Theme
        </Typography>
      </TutorialTooltip>
      <Box className="theme-picker-options" role="group" aria-labelledby={labelId}>
        {themeOptions.map(({ id, label }) => (
          <div key={id} className="theme-picker-option" data-active={id === activeThemeId}>
            <ThemeChip
              themeId={id}
              label={label}
              active={id === activeThemeId}
              onSelect={() => {
                selectTheme(id);
              }}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
};
