import DrawerApprovedList from './DrawerApprovedList/DrawerApprovedList';
import { useNavigate } from 'react-router-dom';
import DrawerActionButton from '@/components/NameGenerator/DrawerActionButton/DrawerActionButton';
import DrawerSection from '@/components/NameGenerator/DrawerSection/DrawerSection';

export default () => {
  const navigate = useNavigate();
  const navToFullList = () => {
    navigate('/list');
  };
  return (
    <DrawerSection title="Approved" footer={<DrawerActionButton text="View Full Name List" onClick={navToFullList} />}>
      <DrawerApprovedList />
    </DrawerSection>
  );
};
