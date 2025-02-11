import { Container, Typography, Button, Card, CardContent } from "@mui/material";
import { AttachMoney, Speed, Code, BarChart } from "@mui/icons-material";
import { Link } from "react-router-dom";

const publisherBenefits = [
  { icon: <AttachMoney fontSize="large" />, title: "High Earnings", desc: "Maximize revenue with high CPM & CPC rates." },
  { icon: <Speed fontSize="large" />, title: "Fast Payouts", desc: "Receive payments quickly with multiple methods." },
  { icon: <Code fontSize="large" />, title: "Easy Integration", desc: "Copy & paste ad codes with seamless setup." },
  { icon: <BarChart fontSize="large" />, title: "AI Optimization", desc: "Our AI ensures the best ad placements for high revenue." },
];

const Publisher = () => {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          className="text-center font-bold mb-10 text-gray-900 dark:text-white"
        >
          Become a Publisher & Start Earning
        </Typography>
        <div className="grid md:grid-cols-2 mt-10 lg:grid-cols-4 gap-6">
          {publisherBenefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="text-green-500">{benefit.icon}</div>
                <Typography variant="h6" className="font-semibold mt-4 text-gray-900 dark:text-white">
                  {benefit.title}
                </Typography>
                <Typography variant="body2" className="mt-2 text-gray-600 dark:text-gray-400">
                  {benefit.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link to="/auth">
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300"
          >
            Join as a Publisher
          </Button>
          </Link>

        </div>
      </Container>
    </div>
  );
};

export default Publisher;
