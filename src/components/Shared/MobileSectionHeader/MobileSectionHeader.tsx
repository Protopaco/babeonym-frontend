import Typography from '@mui/material/Typography';
import './MobileSectionHeader.css';

type Props = {
  title: string;
};

export default ({ title }: Props) => {
  return (
    <div className="mobile-section-header">
      <Typography variant="h6" className="mobile-section-header-title">
        {title}
      </Typography>
    </div>
  );
};
