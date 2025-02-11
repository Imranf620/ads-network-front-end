import { Button, Container, Typography } from "@mui/material";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <Container maxWidth="lg">
        <div className="text-center flex flex-col items-center justify-center">
          <Typography variant="h2" className="font-bold leading-tight">
            Monetize Your Traffic & Maximize Your Earnings!
          </Typography>
          <Typography variant="h6" className="mt-4 opacity-80 max-w-2xl">
            Join our powerful ad network and start earning with high CPM rates and AI-driven ad placements.
          </Typography>
          <div className="mt-6 flex gap-4">
            <Button variant="contained" color="primary" size="large">
              Get Started
            </Button>
            <Button variant="outlined" color="inherit" size="large">
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
