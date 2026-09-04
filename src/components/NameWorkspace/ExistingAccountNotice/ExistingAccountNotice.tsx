import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import InformationalModal from '@/components/Shared/InformationalModal/InformationalModal';
import '@/components/NameWorkspace/ExistingAccountNotice/ExistingAccountNotice.css';

const EXISTING_ACCOUNT_PARAM = 'signedInToExistingAccount';

const NOTICE_BODY =
  "You already had an account with this email, so we signed you in to it. The names from your previous session stayed with that earlier session and aren't shown here.";

const ExistingAccountNotice = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [acknowledged, setAcknowledged] = useState(false);
  // Read once. The parameter is stripped from the URL immediately below, so
  // reading it live would close the modal on the very next render.
  const [signedInToExistingAccount] = useState(() => searchParams.get(EXISTING_ACCOUNT_PARAM) === 'true');

  useEffect(() => {
    if (!searchParams.has(EXISTING_ACCOUNT_PARAM)) {
      return;
    }
    // Drop the flag so a refresh or a copied link does not replay the notice.
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete(EXISTING_ACCOUNT_PARAM);
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const acknowledge = () => {
    setAcknowledged(true);
  };

  return (
    <InformationalModal
      open={signedInToExistingAccount && !acknowledged}
      onClose={acknowledge}
      title="You already had an account"
      bodyText={NOTICE_BODY}
    />
  );
};

export default ExistingAccountNotice;
