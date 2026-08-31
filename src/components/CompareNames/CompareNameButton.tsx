import type { GivenName } from '@/api/generated';
import './CompareNameButton.css';
import PrimaryButton from '../Shared/PrimaryButton/PrimaryButton';

type Props = {
  name: GivenName;
  onVote: (name: GivenName) => void;
};

export default ({ name, onVote }: Props) => <PrimaryButton onClick={() => onVote(name)} text={name.givenName} disabled={false} />;
