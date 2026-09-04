import Skeleton from '@mui/material/Skeleton';
import BaseNameChip from '@/components/Shared/BaseNameChip/BaseNameChip';
import '@/components/Shared/NameChipSkeleton/NameChipSkeleton.css';

type Props = {
  size?: 'default' | 'large' | 'compare';
};

// Built on the chip rather than beside it, so the placeholder cannot drift from
// the real thing's size or shape. Only the name is unknown, so only the name
// shimmers.
const NameChipSkeleton = ({ size = 'default' }: Props) => {
  return (
    <BaseNameChip size={size}>
      <Skeleton className="name-chip-skeleton-text" variant="text" width="100%" />
    </BaseNameChip>
  );
};

export default NameChipSkeleton;
