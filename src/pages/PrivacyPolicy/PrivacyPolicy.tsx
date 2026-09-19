import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageBackLink from '@/components/Shared/PageBackLink/PageBackLink';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import './PrivacyPolicy.css';

// Every statement here is checked against what the app actually does. Change
// the app, check this page.
const SECTIONS = [
  {
    title: 'What we store',
    text: "A single cookie keeps your session, so your list, votes and settings are there when you come back. They're stored on our server. If you create an account, we also store your email address and your Google account ID. Google handles the sign-in, so we never see any other account information.",
  },
  {
    title: 'In your browser',
    text: 'Your theme and tutorial preferences are also saved in your browser, so the app looks right before it loads.',
  },
  {
    title: "What we don't do",
    text: 'No tracking, no ads, and nothing is sold or shared. We keep overall totals, like how many names have been saved, but nothing tied to you. The site runs on third-party hosting, which stores this data only to run it.',
  },
  {
    title: 'Deleting your data',
    text: 'Deleting your account in Settings removes the account and everything tied to it.',
  },
];

// Laid out like Settings and the error page. No wait for the user to load:
// nothing here depends on who is reading it.
const PrivacyPolicy = () => (
  <Box className="privacy-policy">
    <Box className="privacy-policy-column">
      <Box className="privacy-policy-back">
        <PageBackLink />
      </Box>
      <SectionHeader title="Privacy" />
      <Typography variant="body1" className="privacy-policy-text">
        Babeonym is a side project, not a business. It&apos;s here to help you find a name you can agree on, and it keeps only what it needs to do
        that.
      </Typography>
      {SECTIONS.map(({ title, text }) => (
        <section key={title} className="privacy-policy-section">
          <SectionHeader title={title} size="compact" />
          <Typography variant="body1" className="privacy-policy-text">
            {text}
          </Typography>
        </section>
      ))}
    </Box>
  </Box>
);

export default PrivacyPolicy;
