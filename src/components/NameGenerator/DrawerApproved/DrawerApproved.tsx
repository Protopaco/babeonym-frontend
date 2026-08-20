import DrawerApprovedList from './DrawerApprovedList/DrawerApprovedList';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';

export default () => {
  const navigate = useNavigate();
  const navToFullList = () => {
    navigate('/list');
  };
  return (
    <section className="drawer-approved-section">
      <SectionHeader title="Approved" />
      <DrawerApprovedList />
      <SecondaryButton text="View Full Name List" onClick={navToFullList} />
    </section>
  );
};
