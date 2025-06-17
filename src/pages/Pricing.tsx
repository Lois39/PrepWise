
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  HelpCircle, 
  X, 
  ChevronRight, 
  CreditCard, 
  Activity,
  MessageSquare,
  FileCheck,
  Briefcase,
  BarChart4,
  Zap,
  Shield
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PaystackPayment from '@/components/PaystackPayment';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define a pricing tier type for better type safety
interface PricingTier {
  name: string;
  id: string;
  price: { monthly: number; annual: number };
  description: string;
  features: string[];
  limitations: string[];
  cta: string;
  popular: boolean;
  color: string;
}

// Form schema for checkout
const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phoneNumber: z.string().optional(),
  companyName: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const { toast } = useToast();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [subscribed, setSubscribed] = useState<string | null>(null);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
    },
  });
  
  const tiers: PricingTier[] = [
    {
      name: 'Free',
      id: 'free',
      price: { monthly: 0, annual: 0 },
      description: 'Basic interview practice for casual job seekers.',
      features: [
        '5 practice interviews per month',
        'Access to general question bank',
        'Basic performance analytics',
        'Text-based interview practice',
      ],
      limitations: [
        'No industry-specific questions',
        'No personalized feedback',
        'No interview recordings',
        'Limited reports'
      ],
      cta: 'Get Started',
      popular: false,
      color: 'bg-gray-100'
    },
    {
      name: 'Pro',
      id: 'pro',
      price: { monthly: 19.99, annual: 15.99 },
      description: 'Everything you need for serious job preparation.',
      features: [
        'Unlimited practice interviews',
        'Industry-specific questions',
        'Personalized AI feedback',
        'Performance analytics',
        'Interview recordings',
        'Export interview reports',
      ],
      limitations: [
        'Limited expert review'
      ],
      cta: 'Start 7-Day Free Trial',
      popular: true,
      color: 'bg-interview-light'
    },
    {
      name: 'Enterprise',
      id: 'enterprise',
      price: { monthly: 49.99, annual: 39.99 },
      description: 'Advanced features for career professionals.',
      features: [
        'Everything in Pro tier',
        'Expert interview reviews',
        'Priority support',
        'Team collaboration',
        'Custom question libraries',
        'Advanced insights and reporting',
        'Interview benchmarking',
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'bg-gray-100'
    }
  ];

  const handlePurchase = (tier: PricingTier) => {
    if (tier.id === 'free') {
      setSubscribed(tier.id);
      toast({
        title: `${tier.name} Plan Selected`,
        description: "You have successfully signed up for the free plan.",
        variant: "default",
      });
      return;
    }
    
    // For all paid plans (both pro and enterprise), show the payment dialog
    setSelectedTier(tier);
    setShowPaymentDialog(true);
  };
  
  const onSubmit = (data: CheckoutFormValues) => {
    if (!selectedTier) return;
    setProcessingPayment(true);
  };
  
  const handlePaymentSuccess = (reference: string) => {
    setShowPaymentDialog(false);
    setProcessingPayment(false);
    
    if (selectedTier) {
      setSubscribed(selectedTier.id);
      
      toast({
        title: `${selectedTier.name} Plan Subscribed`,
        description: `You have successfully subscribed to the ${selectedTier.name} plan. Reference: ${reference}`,
        variant: "default",
      });
      
      // Store subscription info in localStorage (in real app, would be in database)
      const subscriptionData = {
        plan: selectedTier.id,
        reference,
        date: new Date().toISOString(),
        billingCycle: isAnnual ? 'annual' : 'monthly',
      };
      localStorage.setItem('userSubscription', JSON.stringify(subscriptionData));
    }
  };
  
  const handlePaymentClose = () => {
    setShowPaymentDialog(false);
    setProcessingPayment(false);
  };

  const featureIcons = {
    'Unlimited practice interviews': <Activity className="h-5 w-5" />,
    'Industry-specific questions': <Briefcase className="h-5 w-5" />,
    'Personalized AI feedback': <MessageSquare className="h-5 w-5" />,
    'Performance analytics': <BarChart4 className="h-5 w-5" />,
    'Interview recordings': <FileCheck className="h-5 w-5" />,
    'Export interview reports': <FileCheck className="h-5 w-5" />,
    'Expert interview reviews': <Zap className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="interview-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose the Right Plan for Your Interview Success
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Flexible pricing options to help you ace your next interview
            </p>
            
            <div className="inline-flex items-center rounded-full p-1 bg-gray-100 mb-8">
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  isAnnual 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annual (Save 20%)
              </button>
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  !isAnnual 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier) => (
              <div 
                key={tier.id}
                className={`rounded-xl overflow-hidden shadow-lg ${
                  tier.popular ? 'ring-2 ring-interview-primary transform md:-translate-y-2 scale-105' : ''
                } ${subscribed === tier.id ? 'ring-4 ring-green-500' : ''}`}
              >
                <div className={`${tier.color} px-6 py-8`}>
                  {tier.popular && (
                    <span className="inline-block bg-interview-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${isAnnual ? tier.price.annual : tier.price.monthly}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {tier.price.monthly > 0 ? `/ ${isAnnual ? 'mo (billed annually)' : 'month'}` : ''}
                    </span>
                  </div>
                  <p className="text-gray-600">{tier.description}</p>
                </div>
                
                <div className="bg-white p-6">
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-4">Features included:</h4>
                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                            {featureIcons[feature] || <CheckCircle className="h-5 w-5" />}
                          </span>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {tier.limitations.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-4">Limitations:</h4>
                      <ul className="space-y-3">
                        {tier.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start">
                            <X className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-gray-600">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {subscribed === tier.id ? (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-700 font-medium">Current Plan</span>
                    </div>
                  ) : (
                    <Button 
                      className={`w-full mt-4 ${
                        tier.id === 'pro' || tier.id === 'enterprise'
                          ? 'bg-interview-primary hover:bg-interview-secondary' 
                          : ''
                      }`}
                      variant={tier.id === 'free' ? 'outline' : 'default'}
                      onClick={() => handlePurchase(tier)}
                    >
                      {tier.cta}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto mt-16 bg-white rounded-xl shadow-sm border p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Secure Payment Processing</h2>
                <p className="text-gray-600 mb-4">
                  We use Paystack for secure payment processing. Your payment information is encrypted and protected.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <span>Bank-level security</span>
                  </li>
                  <li className="flex items-center">
                    <CreditCard className="h-5 w-5 text-green-500 mr-2" />
                    <span>Multiple payment methods</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Instant access after payment</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <img 
                  src="https://assets.paystack.com/assets/img/content/paystack-badge-cards.png" 
                  alt="Payment methods" 
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {[
                {
                  q: 'Can I switch between plans?',
                  a: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, the change will take effect at the end of your current billing cycle.'
                },
                {
                  q: 'Is there a free trial available?',
                  a: 'Yes, we offer a 7-day free trial on our Pro plan so you can experience all the premium features before committing.'
                },
                {
                  q: 'How do the interview recordings work?',
                  a: 'Interview recordings capture your responses to practice questions, allowing you to review your performance, body language, and speaking style later. These recordings are stored securely and only accessible to you.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards and payment via Paystack. For Enterprise plans, we can also arrange invoicing.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-interview-background mt-12 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Still have questions?</h3>
              <p className="text-gray-600 mb-6">Our team is here to help you find the right plan for your needs.</p>
              <Button 
                variant="outline" 
                className="border-interview-primary text-interview-primary hover:bg-interview-primary hover:text-white"
                asChild
              >
                <Link to="/contact">
                  Contact Sales <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Subscription</DialogTitle>
            <DialogDescription>
              You're subscribing to the {selectedTier?.name} plan at ${isAnnual 
                ? selectedTier?.price.annual 
                : selectedTier?.price.monthly}/{isAnnual ? "month (billed annually)" : "month"}.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormDescription>
                      For payment confirmation and support
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company Ltd" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Plan</span>
                  <span>{selectedTier?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Price</span>
                  <span>
                    ${isAnnual ? selectedTier?.price.annual : selectedTier?.price.monthly} / {isAnnual ? 'month (billed annually)' : 'month'}
                  </span>
                </div>
                {isAnnual && (
                  <div className="flex justify-between text-sm mt-1">
                    <span className="font-medium">Total today</span>
                    <span className="text-interview-primary font-bold">
                      ${(selectedTier?.price.annual || 0) * 12}
                    </span>
                  </div>
                )}
              </div>
            </form>
          </Form>
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
            
            {selectedTier && form.formState.isValid && (
              <PaystackPayment
                email={form.getValues("email")}
                amount={isAnnual 
                  ? (selectedTier.price.annual * 100 * 12) 
                  : (selectedTier.price.monthly * 100)}
                name={form.getValues("fullName")}
                planId={selectedTier.id}
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentClose}
                buttonText="Complete Payment"
                variant="default"
                className="bg-interview-primary hover:bg-interview-secondary text-white"
                metadata={{
                  phoneNumber: form.getValues("phoneNumber") || "",
                  companyName: form.getValues("companyName") || "",
                  billingCycle: isAnnual ? "annual" : "monthly"
                }}
              />
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Pricing;
