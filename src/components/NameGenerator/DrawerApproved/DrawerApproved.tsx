import Typography from '@mui/material/Typography';
import DrawerApprovedList from './DrawerApprovedList/DrawerApprovedList';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import { useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();
  const navToFullList = () => {
    console.log('click');
    navigate('/list');
  };
  return (
    <>
      <Typography variant="h3"> Approved </Typography>
      <DrawerApprovedList />
      <SecondaryButton text="See Full List" onClick={navToFullList} />
    </>
  );
};
