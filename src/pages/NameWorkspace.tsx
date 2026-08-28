import NameGenerator from '@/components/NameGenerator/NameGenerator';
import CompareNamesMode from '@/components/CompareNames/CompareNamesMode';
import { useSearchParams } from 'react-router-dom';
import './NameWorkspace.css';

const NameWorkspace = () => {
  const [searchParams] = useSearchParams();
  const workspaceMode = searchParams.get('mode') === 'compare' ? 'compare' : 'add';

  if (workspaceMode === 'compare') {
    return <CompareNamesMode />;
  }

  return <NameGenerator />;
};

export default NameWorkspace;
