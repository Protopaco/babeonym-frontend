import Typography from '@mui/material/Typography';
import './GenderFilterColumn.css';

type Props = {
  isOpen: boolean;
};

const GenderFilterColumn = ({ isOpen }: Props) => (
  <div className="gender-filter-column">
    {isOpen && (
      <div className="gender-filter-column-available" aria-label="Gender available filters">
        <Typography className="gender-filter-column-label">Gender</Typography>
      </div>
    )}
    <div className="gender-filter-column-applied" aria-label="Gender applied filters">
      <Typography className="gender-filter-column-placeholder">Applied</Typography>
    </div>
  </div>
);

export default GenderFilterColumn;
