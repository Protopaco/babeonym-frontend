import Typography from '@mui/material/Typography';
import './CultureFilterColumn.css';

type Props = {
  isOpen: boolean;
};

const CultureFilterColumn = ({ isOpen }: Props) => (
  <div className="culture-filter-column">
    {isOpen && (
      <div className="culture-filter-column-available" aria-label="Culture available filters">
        <Typography className="culture-filter-column-label">Culture</Typography>
      </div>
    )}
    <div className="culture-filter-column-applied" aria-label="Culture applied filters">
      <Typography className="culture-filter-column-placeholder">Applied</Typography>
    </div>
  </div>
);

export default CultureFilterColumn;
