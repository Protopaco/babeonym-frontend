import BaseNameChip from '@/components/Shared/BaseNameChip/BaseNameChip';
import '@/components/Shared/NameChipSkeleton/NameChipSkeleton.css';

type Props = {
  size?: 'default' | 'large' | 'compare';
};

// Built on the chip rather than beside it, so the placeholder cannot drift from
// the real thing's size or shape. The one placeholder for a name chip anywhere
// in the app, so every loading chip looks the same.
const NameChipSkeleton = ({ size = 'default' }: Props) => {
  return (
    <div className="name-chip-skeleton">
      <BaseNameChip size={size}>
        <span className="name-chip-skeleton-sweep" />
      </BaseNameChip>
    </div>
  );
};

export default NameChipSkeleton;
