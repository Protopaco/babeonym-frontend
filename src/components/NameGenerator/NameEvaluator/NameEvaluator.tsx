import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { useState } from 'react';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/NameEvaluator/NameEvaluator.css';

export default (props: any) => {
  const { drawerOpen } = props;
  const givenNameContext = useGivenNames();
  const { givenNameCandidates } = givenNameContext.state;
  const { approveCandidate, rejectCandidate, snoozeCandidate } = useGivenNamesActions();

  const approveClick = async () => {
    if (givenNameCandidates && givenNameCandidates.length > 0) {
      await approveCandidate(givenNameCandidates[0].givenCustomNameBridgeId);
    }
  };

  const rejectClick = async () => {
    if (givenNameCandidates && givenNameCandidates.length > 0) {
      await rejectCandidate(givenNameCandidates[0].givenCustomNameBridgeId);
    }
  };

  const snoozeClick = async () => {
    if (givenNameCandidates && givenNameCandidates.length > 0) {
      await snoozeCandidate(givenNameCandidates[0].givenCustomNameBridgeId);
    }
  };

  return (
    <Box id="name-evaluator" className={drawerOpen ? 'drawer-open' : 'drawer-closed'}>
      <p>{givenNameCandidates && givenNameCandidates.length > 0 ? givenNameCandidates[0].givenName : 'no names'}</p>
      <p>
        <button onClick={approveClick}>Approve</button>
        <button onClick={rejectClick}>Reject</button>
        <button onClick={snoozeClick}>Snooze</button>
      </p>
    </Box>
  );
};
