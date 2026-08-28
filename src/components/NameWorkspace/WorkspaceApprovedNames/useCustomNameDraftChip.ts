import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';

type Props = {
  onClose: () => void;
};

export const useCustomNameDraftChip = ({ onClose }: Props) => {
  const [customName, setCustomName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addCustomGivenName } = useGivenNamesActions();
  const trimmedCustomName = customName.trim();
  const canSaveCustomName = trimmedCustomName.length > 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const saveCustomName = async () => {
    if (!trimmedCustomName) {
      onClose();
      return;
    }

    await addCustomGivenName(trimmedCustomName);
    onClose();
  };

  const handleBlur = () => {
    if (!trimmedCustomName) onClose();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') saveCustomName();
    if (event.key === 'Escape') onClose();
  };

  return {
    customName,
    canSaveCustomName,
    handleBlur,
    handleKeyDown,
    inputRef,
    saveCustomName,
    setCustomName,
  };
};
