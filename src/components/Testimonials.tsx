
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "InterviewAI helped me land my dream job at a tech company. The AI feedback was incredibly detailed and helped me refine my responses for the actual interview.",
      author: "Sarah Johnson",
      title: "Software Engineer",
      company: "TechCorp",
      imageIndex: 1
    },
    {
      quote: "After using this platform for just two weeks, I felt so much more confident in my interviews. The practice with real questions makes a huge difference.",
      author: "Michael Chen",
      title: "Product Manager",
      company: "InnovateCo",
      imageIndex: 2
    },
    {
      quote: "As someone who gets nervous during interviews, this tool was a game-changer. Being able to practice in a low-stress environment helped me overcome my anxiety.",
      author: "Jessica Williams",
      title: "Marketing Specialist",
      company: "BrandWave",
      imageIndex: 3
    },
    {
      quote: "The insights from the AI feedback were eye-opening. It pointed out patterns in my responses I never noticed before and gave me specific ways to improve.",
      author: "David Rodriguez",
      title: "Financial Analyst",
      company: "Capital Investments",
      imageIndex: 4
    },
    {
      quote: "I've recommended InterviewAI to everyone in my network. It's like having a personal interview coach available 24/7.",
      author: "Amanda Lee",
      title: "HR Director",
      company: "Global Solutions",
      imageIndex: 5
    },
    {
      quote: "The variety of industry-specific questions helped me prepare for interviews in a highly specialized field. I was impressed by how relevant they were.",
      author: "Robert Taylor",
      title: "Healthcare Administrator",
      company: "MediCare Systems",
      imageIndex: 6
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="interview-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of Job Seekers
          </h2>
          <p className="text-xl text-gray-600">
            See how InterviewAI has helped professionals across industries land their dream jobs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-interview-light mb-4" />
                <p className="text-gray-700 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div 
                      className="w-12 h-12 rounded-full bg-interview-primary text-white flex items-center justify-center font-bold"
                    >
                      {testimonial.author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}, {testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-full">
            <div className="px-4 py-2 bg-interview-primary text-white rounded-full">
              <span className="font-medium">10,000+</span> Interviews Conducted
            </div>
            <div className="px-4 py-2">
              <span className="font-medium">95%</span> Success Rate
            </div>
            <div className="px-4 py-2">
              <span className="font-medium">4.8/5</span> Average Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
