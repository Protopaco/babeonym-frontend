import Typography from '@mui/material/Typography';
import { LONG_NAME_LENGTH } from '@/constants/longNameLength';
import './NameTypography.css';

type Props = {
  name: string;
};

// The text half of a name chip. Sizes itself from the chip's published custom
// property so callers pass a size to the chip only, never to both.
const NameTypography = ({ name }: Props) => {
  return (
    <Typography className="name-typography" data-long={name.length >= LONG_NAME_LENGTH}>
      {name}
    </Typography>
  );
};

export default NameTypography;
