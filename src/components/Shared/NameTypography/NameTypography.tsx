import Typography from '@mui/material/Typography';
import '@/components/Shared/NameTypography/NameTypography.css';

type Props = {
  name: string;
};

// The text half of a name chip. Sizes itself from the chip's published custom
// property so callers pass a size to the chip only, never to both.
const NameTypography = ({ name }: Props) => {
  return <Typography className="name-typography">{name}</Typography>;
};

export default NameTypography;
