import { useGivenNames } from '@/state/givenNameProvider';

const NameGenerator = () => {
  const { state } = useGivenNames();
  const { givenNameCandidates } = state;

  return (
    <>
      NameGenerator
      <p>{givenNameCandidates && givenNameCandidates.length > 0 ? givenNameCandidates[0].givenName : 'no names'}</p>
    </>
  );
};

export default NameGenerator;
