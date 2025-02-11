import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="relative bg-cover bg-center py-24" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,ads')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Container maxWidth="md" className="relative flex flex-col gap-6 text-center text-white">
        <Typography variant="h4" className="font-bold mb-4">
          Start Monetizing Your Traffic Today!
        </Typography>
        <Typography variant="body1" className="mb-6">
          Join thousands of publishers who are earning more with our AI-powered ad optimization.
        </Typography>
        <div className="flex justify-center gap-4">
          <Link to="/auth">
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
          </Link>
          <Link to="/auth">
          <Button variant="outlined" color="secondary" size="large">
            Learn More
          </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default CTA;
