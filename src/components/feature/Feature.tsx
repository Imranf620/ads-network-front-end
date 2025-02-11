import { Container, Typography, Card, CardContent } from "@mui/material";
import { Bolt, AttachMoney, TrackChanges, Code } from "@mui/icons-material";

const features = [
  { icon: <AttachMoney fontSize="large" />, title: "High CPM Rates", desc: "Maximize your earnings with competitive ad rates." },
  { icon: <TrackChanges fontSize="large" />, title: "AI-Powered Targeting", desc: "Advanced AI to place ads where they convert best." },
  { icon: <Bolt fontSize="large" />, title: "Fast Payouts", desc: "Get paid weekly with multiple withdrawal options." },
  { icon: <Code fontSize="large" />, title: "Easy Integration", desc: "Place ads in minutes with simple integration." },
];

const Feature = () => {
  return (
    <div className="py-20 bg-gray-100">
      <Container maxWidth="lg">
        <Typography variant="h4" className="text-center font-bold mb-10 text-gray-900">
          Why Choose Our Ad Network?
        </Typography>
        <div className="grid md:grid-cols-2 mt-10 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 flex justify-center items-center bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-white rounded-lg mb-4">
                  {feature.icon}
                </div>
                <Typography variant="h6" className="font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </Typography>
                <Typography variant="body2" className="mt-2 text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Feature;
