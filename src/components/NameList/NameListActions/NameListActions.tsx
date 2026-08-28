import Box from '@mui/material/Box';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import './NameListActions.css';

type Props = {
  onCompareNamesClick: () => void;
};

export default ({ onCompareNamesClick }: Props) => {
  return (
    <Box className="name-list-actions">
      <PrimaryButton text="Compare Names" onClick={onCompareNamesClick} size="wide" />
    </Box>
  );
};
