import Box from '@mui/material/Box';
import './NameListSkeleton.css';

const skeletonItems = Array.from({ length: 12 }, (_, index) => `saved-name-skeleton-${index}`);

export default () => {
  return (
    <Box className="name-list-skeleton" aria-label="Loading saved names">
      {skeletonItems.map((skeletonItem) => (
        <Box className="name-list-skeleton-chip" key={skeletonItem}>
          <Box className="name-list-skeleton-label" />
        </Box>
      ))}
    </Box>
  );
};
