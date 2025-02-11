import { Container, Typography, Card, CardContent } from "@mui/material";
import { PersonAdd, Code, MonetizationOn } from "@mui/icons-material";

const steps = [
  { icon: <PersonAdd fontSize="large" />, title: "Sign Up", desc: "Create your account in minutes and get started." },
  { icon: <Code fontSize="large" />, title: "Place Ads", desc: "Copy and paste the ad code to your website or app." },
  { icon: <MonetizationOn fontSize="large" />, title: "Start Earning", desc: "Watch your revenue grow with our high CPM ads." },
];

const Guide = () => {
  return (
    <div className="py-20 bg-white">
      <Container maxWidth="lg">
        <Typography variant="h4" className="text-center font-bold mb-8">
          How It Works?
        </Typography>
        <div className="grid mt-10 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="shadow-md rounded-xl">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="text-purple-500">{step.icon}</div>
                <Typography variant="h6" className="font-semibold mt-4">
                  {step.title}
                </Typography>
                <Typography variant="body2" className="mt-2 text-gray-600">
                  {step.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Guide;
