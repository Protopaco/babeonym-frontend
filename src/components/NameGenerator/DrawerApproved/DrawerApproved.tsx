import DrawerApprovedList from './DrawerApprovedList/DrawerApprovedList';
import { useNavigate } from 'react-router-dom';
import DrawerActionButton from '@/components/NameGenerator/DrawerActionButton/DrawerActionButton';
import DrawerSection from '@/components/NameGenerator/DrawerSection/DrawerSection';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './DrawerApproved.css';

export default () => {
  const navigate = useNavigate();
  const navToFullList = () => {
    navigate('/list');
  };
  return (
    <DrawerSection
      title={
        <TutorialTooltip title="Names you saved" placement="top">
          <span>Approved</span>
        </TutorialTooltip>
      }
      footer={<DrawerActionButton text="View Full Name List" onClick={navToFullList} />}
    >
      <DrawerApprovedList />
    </DrawerSection>
  );
};
