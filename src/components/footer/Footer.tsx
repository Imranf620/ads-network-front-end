import { Container, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <Container maxWidth="lg" className="text-center">
        <Typography variant="h5" className="font-semibold mb-4">
          Your Ad Network
        </Typography>
        <div className="flex justify-center space-x-6 mb-4">
          <IconButton color="inherit">
            <Facebook />
          </IconButton>
          <IconButton color="inherit">
            <Twitter />
          </IconButton>
          <IconButton color="inherit">
            <LinkedIn />
          </IconButton>
          <IconButton color="inherit">
            <YouTube />
          </IconButton>
        </div>
        <Typography variant="body2" className="text-gray-400">
          © {new Date().getFullYear()} Your Ad Network. All Rights Reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
