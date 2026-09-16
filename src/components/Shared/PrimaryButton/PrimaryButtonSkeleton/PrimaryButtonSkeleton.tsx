import Skeleton from '@mui/material/Skeleton';
import './PrimaryButtonSkeleton.css';

type Props = {
  size?: 'default' | 'wide' | 'compact' | 'compact-wide';
};

const PrimaryButtonSkeleton = ({ size = 'default' }: Props) => (
  <Skeleton className="primary-button-skeleton" data-size={size} variant="rounded" />
);

export default PrimaryButtonSkeleton;
