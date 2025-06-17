
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import LiveChat from '../components/LiveChat';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating form submission
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="interview-container">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Your name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="Your email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="What is this regarding?" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="How can we help you?" 
                      rows={6}
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-interview-primary hover:bg-interview-secondary">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-interview-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:support@prepwise.com" className="text-gray-600 hover:text-interview-primary">
                          support@prepwise.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-interview-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+1-800-123-4567" className="text-gray-600 hover:text-interview-primary">
                          +1-800-123-4567
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-interview-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-gray-600">
                          123 PrepWise Avenue<br />
                          San Francisco, CA 94103<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Support Hours</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM ET</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM ET</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-interview-background p-4 rounded-lg">
                <div className="flex items-center text-interview-primary">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span className="font-medium">Live Chat Available</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Chat with our support team during business hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <LiveChat />
    </div>
  );
};

export default Contact;
