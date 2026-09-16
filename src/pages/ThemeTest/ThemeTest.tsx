import React from 'react';
import './ThemeTest.css';
import {
  Box,
  Stack,
  Typography,
  Divider,
  Button,
  TextField,
  Paper,
  Card,
  CardContent,
  Chip,
  Alert,
  Switch,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
  LinearProgress,
} from '@mui/material';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Stack spacing={2}>
    <Stack spacing={0.5}>
      <Typography variant="h3">{title}</Typography>
      <Divider />
    </Stack>
    {children}
  </Stack>
);

const ThemeProofScreen = () => {
  const [toggle, setToggle] = React.useState<string | null>('left');
  const [checked, setChecked] = React.useState(true);

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Stack spacing={4} sx={{ maxWidth: 1100, mx: 'auto' }}>
        {/* Header */}
        <Stack spacing={1}>
          <Typography variant="h1">Theme Proof</Typography>
          <Typography variant="body1">Validate typography, spacing, palette, and common component states across breakpoints.</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Chip" />
            <Chip label="Selected" color="primary" />
            <Chip label="Secondary" color="secondary" />
            <Chip label="Outlined" variant="outlined" />
          </Stack>
        </Stack>

        {/* Typography */}
        <Section title="Typography">
          <Stack spacing={2}>
            <Typography variant="h1">H1 — League Spartan</Typography>
            <Typography variant="h2">H2 — League Spartan</Typography>
            <Typography variant="h3">H3 — League Spartan</Typography>

            <Stack spacing={1}>
              <Typography variant="body1">Body1 — The quick brown fox jumps over the lazy dog. 0123456789</Typography>
              <Typography variant="body1">
                <strong>Body1 bold</strong> — use for emphasis inside body copy.
              </Typography>
              <Typography variant="caption">Caption — helper / meta text</Typography>
            </Stack>
          </Stack>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button variant="contained">Contained</Button>
              <Button variant="contained" color="secondary">
                Contained Secondary
              </Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
            </Stack>

            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button variant="contained" size="small">
                Small
              </Button>
              <Button variant="contained" size="medium">
                Medium
              </Button>
              <Button variant="contained" size="large">
                Large
              </Button>
            </Stack>
          </Stack>
        </Section>

        {/* Inputs */}
        <Section title="Inputs">
          <Stack spacing={2} sx={{ maxWidth: 520 }}>
            <TextField label="Default" />
            <TextField label="With helper" helperText="Helper text" />
            <TextField label="Error" error helperText="Error helper text" />
            <TextField label="Disabled" disabled defaultValue="Disabled" />
            <TextField label="Multiline" multiline minRows={3} defaultValue="Multiline text..." />
          </Stack>
        </Section>

        {/* Surfaces */}
        <Section title="Surfaces">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Paper sx={{ p: 2, flex: 1 }}>
              <Stack spacing={1}>
                <Typography variant="h3">Paper</Typography>
                <Typography variant="body1">Paper uses background.paper and elevation/shadows.</Typography>
                <Divider />
                <Typography variant="body1">Spacing test: 8px scale via theme.spacing.</Typography>
              </Stack>
            </Paper>

            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h3">Card</Typography>
                  <Typography variant="body1">Card radius + padding + typography rhythm.</Typography>
                  <Divider />
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip label="Tag" size="small" />
                    <Chip label="Tag" size="small" variant="outlined" />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Section>

        {/* Feedback / state */}
        <Section title="Feedback and state">
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Alert severity="success" sx={{ flex: 1 }}>
                Success alert
              </Alert>
              <Alert severity="warning" sx={{ flex: 1 }}>
                Warning alert
              </Alert>
              <Alert severity="error" sx={{ flex: 1 }}>
                Error alert
              </Alert>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="body1">Progress</Typography>
              <LinearProgress />
            </Stack>

            <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
              <FormControlLabel control={<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label="Switch" />

              <ToggleButtonGroup value={toggle} exclusive onChange={(_, v) => setToggle(v)} aria-label="toggle">
                <ToggleButton value="left">Left</ToggleButton>
                <ToggleButton value="center">Center</ToggleButton>
                <ToggleButton value="right">Right</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>
        </Section>

        {/* Footer spacing check */}
        <Divider />
        <Typography variant="caption">Tip: resize window to validate responsive typography at xs/sm/md.</Typography>
      </Stack>
    </Box>
  );
};

export default ThemeProofScreen;
