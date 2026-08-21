import TextField from '@mui/material/TextField';
import './FilterSearchField.css';

type Props = {
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export default ({ id, onChange, type = 'text' }: Props) => {
  return <TextField className="filter-search-field" id={id} label="Search" variant="outlined" onChange={onChange} type={type} />;
};
