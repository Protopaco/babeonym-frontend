import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTutorial } from '@/state/tutorial/tutorial.context';
import './MobileTutorialHint.css';

type MobileTutorialHintProps = {
  text: string;
};

export default ({ text }: MobileTutorialHintProps) => {
  const { tutorialEnabled } = useTutorial();

  if (!tutorialEnabled) {
    return null;
  }

  return (
    <Box className="mobile-tutorial-hint">
      <Typography variant="body2" className="mobile-tutorial-hint-text">
        {text}
      </Typography>
    </Box>
  );
};
