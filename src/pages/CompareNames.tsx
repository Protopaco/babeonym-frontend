
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import './CompareNames.css';

const CompareNames = () => {
  return (
    <Container maxWidth="lg" id="compare-names-container">
      <Box id="compare-names-header">
        <SectionHeader
          title="Compare Names"
          action={
            <Link id="compare-names-return-link" to="/list">
              Your Names
            </Link>
          }
        />
        <MobileSectionHeader title="Compare Names" />
      </Box>
      <Box id="compare-names-content">
        <Typography id="compare-names-empty-state">Choose two saved names to compare.</Typography>
      </Box>
    </Container>
  );
};

export default CompareNames;
