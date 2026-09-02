import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import getCustomNameErrorMessage from '@/utils/getCustomNameErrorMessage';

type Props = {
  onClose: () => void;
};

export const useCustomNameDraftChip = ({ onClose }: Props) => {
  const [customName, setCustomName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addCustomGivenName } = useGivenNamesActions();
  const trimmedCustomName = customName.trim();
  // Blocking while saving keeps a second Enter from queueing a duplicate.
  const canSaveCustomName = trimmedCustomName.length > 0 && !saving;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const changeCustomName = (updatedCustomName: string) => {
    setCustomName(updatedCustomName);
    setErrorMessage('');
  };

  const saveCustomName = async () => {
    if (!trimmedCustomName) {
      onClose();
      return;
    }

    setSaving(true);
    try {
      await addCustomGivenName(trimmedCustomName);
      onClose();
    } catch (error) {
      // The draft stays open with its text so the name can be edited and retried.
      setErrorMessage(getCustomNameErrorMessage(error));
      inputRef.current?.focus();
    } finally {
      setSaving(false);
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
  };
};
