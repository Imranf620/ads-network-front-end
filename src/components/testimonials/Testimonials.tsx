import { Container, Typography, Card, CardContent, Avatar, Rating } from "@mui/material";

const testimonials = [
  {
    name: "Ali Khan",
    feedback: "This ad network has helped me double my website revenue. Highly recommended!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Sarah Ahmed",
    feedback: "Easy to use, great support, and amazing CPM rates. I love the platform!",
    rating: 4.5,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "David Smith",
    feedback: "I switched from another network, and the difference in earnings is huge!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <Container maxWidth="lg">
        <Typography variant="h4" className="text-center font-bold mb-10 text-gray-900 dark:text-white">
          What Our Publishers Say
        </Typography>
        <div className="grid md:grid-cols-3 mt-10 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="flex flex-col items-center text-center p-6">
                <Avatar 
                  src={testimonial.avatar} 
                  sx={{ width: 72, height: 72 }} 
                  className="border-4 border-purple-500"
                />
                <Typography variant="h6" className="font-semibold mt-4 text-gray-900 dark:text-white">
                  {testimonial.name}
                </Typography>
                <Rating value={testimonial.rating} precision={0.5} readOnly className="mt-2" />
                <Typography variant="body2" className="mt-2 text-gray-600 dark:text-gray-400">
                  "{testimonial.feedback}"
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;
