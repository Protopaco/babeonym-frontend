import { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import '@/components/Settings/AboutButton/CopyEmailButton.css';

// Long enough to be seen without the button sitting in a state that no longer
// describes what it does.
const COPIED_RESET_MS = 2000;

const COPY_LABEL = 'Copy email address';
const COPIED_LABEL = 'Copied';

type Props = {
  email: string;
};

// Confirms in place by swapping its own icon. The app has no toast layer, and
// the label swaps with the icon so the confirmation is not visual only.
const CopyEmailButton = ({ email }: Props) => {
  const [copied, setCopied] = useState(false);
  const resetTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(resetTimeoutRef.current);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // The address is still on screen to type, so an unavailable or refused
      // clipboard leaves the button as it was rather than reporting a failure.
      return;
    }

    setCopied(true);
    window.clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
  };

  return (
    <IconButton className="copy-email-button" aria-label={copied ? COPIED_LABEL : COPY_LABEL} onClick={handleCopy}>
      {copied ? <CheckIcon /> : <ContentCopyIcon />}
    </IconButton>
  );
};

export default CopyEmailButton;
