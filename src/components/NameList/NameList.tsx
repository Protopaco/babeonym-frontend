import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './NameList.css';
import Divider from '@mui/material/Divider';

const NameList = () => {
  return (
    <Container maxWidth="lg" id="name-list-container">
      <Typography id="name-list-title" variant="h1" color="primary">
        Your Names
      </Typography>
      <Divider id="name-list-divider" variant="middle" flexItem />
    </Container>
  );
};

export default NameList;
