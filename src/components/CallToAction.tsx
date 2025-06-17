
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 bg-interview-primary text-white">
      <div className="interview-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Start practicing today and gain the confidence you need to succeed.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['Real-time AI Feedback', 'Industry-Specific Questions', 'Personalized Reports', 'Free Getting Started'].map((feature, i) => (
              <div key={i} className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 mr-2 text-white" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              className="bg-white text-interview-primary hover:bg-gray-100 px-8 py-6 text-lg font-medium rounded-lg"
              asChild
            >
              <Link to="/interview">
                Start Free Practice
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg font-medium rounded-lg flex items-center"
              asChild
            >
              <Link to="/pricing" className="text-white hover:text-white/80">
                View Premium Plans <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
