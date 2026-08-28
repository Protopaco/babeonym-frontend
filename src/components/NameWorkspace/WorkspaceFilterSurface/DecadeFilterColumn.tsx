import Typography from '@mui/material/Typography';
import './DecadeFilterColumn.css';

type Props = {
  isOpen: boolean;
};

const DecadeFilterColumn = ({ isOpen }: Props) => (
  <div className="decade-filter-column">
    {isOpen && (
      <div className="decade-filter-column-available" aria-label="Decade available filters">
        <Typography className="decade-filter-column-label">Decade</Typography>
      </div>
    )}
    <div className="decade-filter-column-applied" aria-label="Decade applied filters">
      <Typography className="decade-filter-column-placeholder">Applied</Typography>
    </div>
  </div>
);

export default DecadeFilterColumn;
