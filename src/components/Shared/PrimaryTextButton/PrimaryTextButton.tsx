import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import '@/components/Shared/PrimaryTextButton/PrimaryTextButton.css';

type Props = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  size?: 'default' | 'wide' | 'compact' | 'compact-wide';
  tone?: 'default' | 'danger';
  emphasis?: 'outline' | 'fill';
};

// A labelled button. It owns how the label reads and leaves the box to
// PrimaryButton, so a caller passes a string and nothing else changes.
const PrimaryTextButton = ({ text, onClick, disabled = false, size = 'default', tone = 'default', emphasis = 'outline' }: Props) => {
  return (
    <PrimaryButton onClick={onClick} disabled={disabled} size={size} tone={tone} emphasis={emphasis}>
      <span className="primary-text-button-label">{text}</span>
    </PrimaryButton>
  );
};

export default PrimaryTextButton;
