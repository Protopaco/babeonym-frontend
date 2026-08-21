import Box from '@mui/material/Box';
import './FilterAccordionSkeleton.css';

export default () => {
  return (
    <Box className="filter-accordion-skeleton-list" aria-label="Loading filters">
      {['gender', 'decades', 'languages', 'cultures'].map((filterName) => (
        <Box className="filter-accordion-skeleton-row" key={filterName}>
          <Box className="filter-accordion-skeleton-label" />
          <Box className="filter-accordion-skeleton-icon" />
        </Box>
      ))}
    </Box>
  );
};
