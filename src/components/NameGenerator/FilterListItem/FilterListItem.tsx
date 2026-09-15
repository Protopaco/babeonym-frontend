import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import './FilterListItem.css';

type Props = {
  index: number;
  label: string;
  action: any;
  selected: boolean;
};

export default ({ index, label, action, selected }: Props) => {
  return (
    <ListItemButton className="filter-list-item" key={index} onClick={action}>
      <ListItemIcon>
        {selected ? (
          <CheckBoxIcon className="filter-list-item-checkbox filter-list-item-checkbox--checked" />
        ) : (
          <CheckBoxOutlineBlankIcon className="filter-list-item-checkbox" />
        )}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
