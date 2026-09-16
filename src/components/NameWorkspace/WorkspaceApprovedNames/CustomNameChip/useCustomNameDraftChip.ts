import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import getCustomNameErrorMessage from '@/utils/getCustomNameErrorMessage';
import normalizeNameInput from '@/utils/normalizeNameInput';

type Props = {
  onClose: () => void;
};

export const useCustomNameDraftChip = ({ onClose }: Props) => {
  const [customName, setCustomName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { state } = useGivenNames();
  const { addCustomGivenName } = useGivenNamesActions();
  const trimmedCustomName = customName.trim();
  // Blocking while saving keeps a second Enter from queueing a duplicate.
  const canSaveCustomName = trimmedCustomName.length > 0 && !saving;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const changeCustomName = (updatedCustomName: string) => {
    setCustomName(normalizeNameInput(updatedCustomName));
    setErrorMessage('');
  };

  const saveCustomName = async () => {
    if (!trimmedCustomName) {
      onClose();
      return;
    }

    // Refused here rather than sent, because the server accepts a duplicate
    // silently and the draft would close as if a name had been added. Matched
    // case-insensitively, as the server matches canonical names.
    const lowercaseCustomName = trimmedCustomName.toLowerCase();
    const isAlreadyApproved = state.approvedGivenNames.some((approvedGivenName) => approvedGivenName.givenName.toLowerCase() === lowercaseCustomName);
    if (isAlreadyApproved) {
      setErrorMessage('That name is already on your list.');
      inputRef.current?.focus();
      return;
    }

    setSaving(true);
    try {
      await addCustomGivenName(trimmedCustomName);
      // Saving is left on. The draft is still on screen while it animates out,
      // and clearing it here would snap the chip back from its dimmed state
      // mid-exit.
      onClose();
    } catch (error) {
      // The draft stays open with its text so the name can be edited and retried.
      setSaving(false);
      setErrorMessage(getCustomNameErrorMessage(error));
      inputRef.current?.focus();
    }
  };

  const handleBlur = () => {
    if (!trimmedCustomName) onClose();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !saving) saveCustomName();
    if (event.key === 'Escape') onClose();
  };

  return {
    customName,
    canSaveCustomName,
    changeCustomName,
    errorMessage,
    handleBlur,
    handleKeyDown,
    inputRef,
    saveCustomName,
    saving,
  };
};
