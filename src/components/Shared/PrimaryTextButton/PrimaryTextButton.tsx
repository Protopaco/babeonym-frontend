import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import motionTokens from '@/themes/motion.theme';
import './PrimaryTextButton.css';

type Props = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  size?: 'default' | 'wide' | 'compact' | 'compact-wide' | 'compact-wider' | 'compact-narrow';
  tone?: 'default' | 'danger' | 'action';
  emphasis?: 'outline' | 'fill';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  // Set only by buttons whose label comes and goes. Collapsed leaves the icon
  // alone; the caller decides when, this component only animates the change.
  labelVisibility?: 'visible' | 'collapsed';
};

// A labelled button. It owns how the label reads and leaves the box to
// PrimaryButton, so a caller passes a string and nothing else changes.
const PrimaryTextButton = ({
  text,
  onClick,
  disabled = false,
  size = 'default',
  tone = 'default',
  emphasis = 'outline',
  startIcon,
  endIcon,
  labelVisibility,
}: Props) => {
  const shouldReduceMotion = useReducedMotion();
  const label = <span className="primary-text-button-label">{text}</span>;

  return (
    <PrimaryButton onClick={onClick} disabled={disabled} size={size} tone={tone} emphasis={emphasis}>
      <span className="primary-text-button" aria-label={text}>
        {startIcon && <span className="primary-text-button-icon-start">{startIcon}</span>}
        {labelVisibility === undefined ? (
          label
        ) : (
          // Width rather than a layout animation: the button really grows, so
          // whatever sits beside it gives way smoothly and nothing is scaled.
          <AnimatePresence initial={false}>
            {labelVisibility === 'visible' && (
              <motion.span
                className="primary-text-button-label-clip"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{
                  width: { duration: shouldReduceMotion ? 0 : motionTokens.durationSeconds[180], ease: motionTokens.ease.out },
                  opacity: { duration: motionTokens.durationSeconds[120], ease: motionTokens.ease.out },
                }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        )}
        {endIcon && <span className="primary-text-button-icon-end">{endIcon}</span>}
      </span>
    </PrimaryButton>
  );
};

export default PrimaryTextButton;
