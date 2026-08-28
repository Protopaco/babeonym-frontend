import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import './NameListEmptyState.css';

export default () => {
  return (
    <Box className="name-list-empty-state">
      <Typography variant="h5" className="name-list-empty-state-title">
        No saved names yet
      </Typography>
      <Typography className="name-list-empty-state-copy">
        Head to the{' '}
        <Link className="name-list-empty-state-link" to="/">
          Name Generator
        </Link>{' '}
        to start saving favorites.
      </Typography>
    </Box>
  );
};
