import Typography from '@mui/material/Typography';
import DrawerApprovedList from './DrawerApprovedList/DrawerApprovedList';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import { useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();
  const navToFullList = () => {
    navigate('/list');
  };
  return (
    <section className="drawer-approved-section">
      <Typography variant="h3">Approved</Typography>
      <DrawerApprovedList />
      <SecondaryButton text="View Full Name List" onClick={navToFullList} />
    </section>
  );
};
