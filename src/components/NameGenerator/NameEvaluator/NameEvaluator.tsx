import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/NameEvaluator/NameEvaluator.css';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import { Typography } from '@mui/material';
import { useUser } from '@/state/user/user.context';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import IconButton from '@mui/material/IconButton';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import { AnimatePresence, motion } from 'motion/react';
import GeneratedNameSkeleton from '@/components/NameGenerator/GeneratedNameSkeleton/GeneratedNameSkeleton';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';

type Props = {
  drawerOpen: boolean;
};

export default ({ drawerOpen }: Props) => {
  const givenNameContext = useGivenNames();
  const { state: userState } = useUser();
  const { user } = userState;
  const { givenNameCandidates, givenNameProviderLoaded } = givenNameContext.state;
  const { approveCandidate, rejectCandidate, snoozeCandidate } = useGivenNamesActions();
  const currentCandidate = givenNameCandidates && givenNameCandidates.length > 0 ? givenNameCandidates[0] : null;

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
      <Box id="name-evaluator-column">
        <Box id="name-evaluator-header">
          <SectionHeader title="Name Generator" width="medium" />
          <MobileSectionHeader title="Name Generator" />
        </Box>
        <Box id="name-evaluator-content">
          <Box id="evaluated-name-slot">
            {givenNameProviderLoaded ? (
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentCandidate?.givenCustomNameBridgeId ?? 'no-names'}
                  className="evaluated-name-motion"
                  initial={{ opacity: 0, y: 42 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -42 }}
                  transition={{ duration: 0.26, ease: 'easeOut' }}
                >
                  <TutorialTooltip title="Do you like this name?" placement="top">
                    <Typography variant="h2" id="evaluated-name">
                      {currentCandidate ? currentCandidate.givenName : 'no names'}
                    </Typography>
                  </TutorialTooltip>
                </motion.div>
              </AnimatePresence>
            ) : (
              <GeneratedNameSkeleton />
            )}
          </Box>
          {user?.surName ? (
            <Typography variant="h3" id="user-surname">
              {user.surName}
            </Typography>
          ) : null}
          <Box id="name-evaluator-button-container">
            <PrimaryButton onClick={approveClick} text="Approve" disabled={!givenNameProviderLoaded || !currentCandidate} />
            <TutorialTooltip title="Skip this name for now" placement="top">
              <PrimaryButton onClick={snoozeClick} text="Snooze" disabled={!givenNameProviderLoaded || !currentCandidate} />
            </TutorialTooltip>
            <PrimaryButton onClick={rejectClick} text="Reject" disabled={!givenNameProviderLoaded || !currentCandidate} />
          </Box>
          <Box id="name-evaluator-mobile-button-container">
            <IconButton
              className="name-evaluator-mobile-action-button"
              onClick={approveClick}
              disabled={!givenNameProviderLoaded || !currentCandidate}
              aria-label="Approve name"
            >
              <ThumbUpOutlinedIcon />
            </IconButton>
            <IconButton
              className="name-evaluator-mobile-action-button"
              onClick={snoozeClick}
              disabled={!givenNameProviderLoaded || !currentCandidate}
              aria-label="Snooze name"
            >
              <BedtimeOutlinedIcon />
            </IconButton>
            <IconButton
              className="name-evaluator-mobile-action-button"
              onClick={rejectClick}
              disabled={!givenNameProviderLoaded || !currentCandidate}
              aria-label="Reject name"
            >
              <ThumbDownOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
