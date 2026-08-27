import { useEffect, useMemo, useState } from 'react';
import type { GivenName } from '@/api/generated';
import type { ComparePair } from '@/components/CompareNames/compareNames.types';

const getPairSignature = (pair: ComparePair) => {
  return [pair.left.givenCustomNameBridgeId, pair.right.givenCustomNameBridgeId].sort((left, right) => left - right).join(':');
};

const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

const createRandomPair = (names: GivenName[], previousPair?: ComparePair | null): ComparePair | null => {
  if (names.length < 2) {
    return null;
  }

  const previousSignature = previousPair ? getPairSignature(previousPair) : null;
  const maxAttempts = names.length > 2 ? 10 : 1;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const leftIndex = getRandomIndex(names.length);
    let rightIndex = getRandomIndex(names.length - 1);

    if (rightIndex >= leftIndex) {
      rightIndex += 1;
    }

    const pair = {
      left: names[leftIndex],
      right: names[rightIndex],
    };

    if (names.length === 2 || getPairSignature(pair) !== previousSignature) {
      return pair;
    }
  }

  const previousIds = new Set(previousPair ? [previousPair.left.givenCustomNameBridgeId, previousPair.right.givenCustomNameBridgeId] : []);
  const left = names.find((name) => !previousIds.has(name.givenCustomNameBridgeId)) ?? names[0];
  const right = names.find((name) => name.givenCustomNameBridgeId !== left.givenCustomNameBridgeId) ?? names[1];

  return { left, right };
};

export const useCompareNamePair = (approvedGivenNames: GivenName[], givenNameProviderLoaded: boolean) => {
  const [currentPair, setCurrentPair] = useState<ComparePair | null>(null);
  const hasEnoughNames = approvedGivenNames.length >= 2;

  const currentPairStillAvailable = useMemo(() => {
    if (!currentPair) {
      return false;
    }

    const approvedNameIds = new Set(approvedGivenNames.map((name) => name.givenCustomNameBridgeId));
    return approvedNameIds.has(currentPair.left.givenCustomNameBridgeId) && approvedNameIds.has(currentPair.right.givenCustomNameBridgeId);
  }, [approvedGivenNames, currentPair]);

  useEffect(() => {
    if (!givenNameProviderLoaded || !hasEnoughNames) {
      setCurrentPair(null);
      return;
    }

    if (!currentPair || !currentPairStillAvailable) {
      setCurrentPair(createRandomPair(approvedGivenNames, currentPair));
    }
  }, [approvedGivenNames, currentPair, currentPairStillAvailable, givenNameProviderLoaded, hasEnoughNames]);

  const advancePair = () => {
    setCurrentPair((previousPair) => createRandomPair(approvedGivenNames, previousPair));
  };

  return {
    currentPair,
    advancePair,
  };
};
