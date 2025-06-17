
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="interview-container">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Find answers to the most common questions about PrepWise and interview preparation</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">How does PrepWise help with interview preparation?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    PrepWise offers a comprehensive interview preparation platform with AI-powered interview simulations, personalized feedback, a vast question bank covering multiple industries, detailed performance analytics, and expert-curated guides and tips. Our system helps you identify strengths and areas for improvement to maximize your interview success.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">What types of interviews can I practice on PrepWise?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    PrepWise supports a wide range of interview types including behavioral, technical, leadership, industry-specific, case, and performance interviews. You can select the job role and interview type that matches your target position to receive tailored questions and feedback.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">Is PrepWise suitable for all career levels?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Yes, PrepWise is designed for job seekers at all stages of their careers. We have content tailored for entry-level positions, mid-career professionals, and senior leadership roles across various industries and functions.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium">How accurate is the AI feedback?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Our AI feedback system has been trained on thousands of real interviews and industry best practices. It evaluates multiple aspects of your responses including content quality, structure, relevance, and delivery. While no AI system is perfect, our users report that the feedback closely aligns with what they receive in actual interviews.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium">What is included in the free version vs. paid plans?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    The free version gives you access to basic interview practice with limited questions and basic feedback. Our paid plans include unlimited interview simulations, comprehensive AI feedback, full access to our question bank, detailed performance analytics, mock interviews with industry specialists, and priority access to new features.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-medium">Can I practice video interviews on PrepWise?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Yes! PrepWise supports video interview practice. You can enable your camera during practice sessions to simulate the experience of a video interview, helping you improve your visual presentation, body language, and eye contact while answering questions.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-medium">How should I prepare before using PrepWise?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    For the best experience, we recommend having a quiet environment, a working microphone and camera (optional), and setting aside uninterrupted time for practice. Review your resume and the job descriptions you're targeting to better tailor your responses. Our system works best when you treat the practice sessions like real interviews.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-lg font-medium">Can I download my interview recordings and feedback?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Yes, paid plan users can download PDF reports of their interview performance, including response transcriptions, AI feedback, scores, and improvement suggestions. This allows you to review your progress offline and focus on specific areas for improvement.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="bg-interview-background p-6 rounded-lg border border-interview-light">
              <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
              <p className="text-gray-700 mb-4">
                If you couldn't find the answer you were looking for, please reach out to our support team.
              </p>
              <div className="flex space-x-4">
                <a href="/contact" className="text-interview-primary hover:underline">Contact Support</a>
                <span className="text-gray-400">|</span>
                <a href="mailto:support@prepwise.com" className="text-interview-primary hover:underline">support@prepwise.com</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
