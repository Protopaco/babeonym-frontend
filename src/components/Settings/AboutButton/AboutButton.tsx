import { useState } from 'react';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import AboutModal from '@/components/Settings/AboutButton/AboutModal';
import '@/components/Settings/AboutButton/AboutButton.css';

// Just the button and its dialog. Settings owns the row the button sits in,
// because Settings is the only page that will ever hold it.
const AboutButton = () => {
  const [aboutOpen, setAboutOpen] = useState(false);

  const openAbout = () => {
    setAboutOpen(true);
  };

  const closeAbout = () => {
    setAboutOpen(false);
  };

  return (
    <>
      <PrimaryTextButton text="About" size="compact-wide" onClick={openAbout} />
      <AboutModal open={aboutOpen} onClose={closeAbout} />
    </>
  );
};

export default AboutButton;
