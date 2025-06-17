
import { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

interface PaystackPaymentProps {
  email: string;
  amount: number; // in kobo/cents
  name: string;
  planId: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
  buttonText: string;
  variant?: 'default' | 'outline';
  className?: string;
  metadata?: Record<string, any>;
}

const PaystackPayment = ({
  email,
  amount,
  name,
  planId,
  onSuccess,
  onClose,
  buttonText,
  variant = 'default',
  className = '',
  metadata = {}
}: PaystackPaymentProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Production ready Paystack public key setup
  // Use a default test key if not in env
  const paystackPublicKey = 'pk_test_3edf3589281462f57e24a4c3d4af1449d8cb2a69';
  
  // Configure Paystack props with enhanced metadata
  const paystackProps = {
    email,
    amount, // Paystack amount is in kobo/cents (smallest currency unit)
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: name
        },
        {
          display_name: "Plan ID",
          variable_name: "planId",
          value: planId
        },
        ...Object.entries(metadata).map(([key, value]) => ({
          display_name: key.charAt(0).toUpperCase() + key.slice(1),
          variable_name: key,
          value: String(value)
        }))
      ]
    },
    publicKey: paystackPublicKey,
    text: buttonText,
    onSuccess: (reference: { reference: string }) => {
      setIsProcessing(false);
      onSuccess(reference.reference);
      toast({
        title: "Payment Successful",
        description: `Your payment was successful with reference: ${reference.reference}`,
      });
    },
    onClose: () => {
      setIsProcessing(false);
      onClose();
      toast({
        title: "Payment Cancelled",
        description: "You have cancelled the payment",
      });
    },
  };

  const handlePaymentInitiation = () => {
    setIsProcessing(true);
    // Fix the TypeScript error by properly typing the element
    const paystackButtonElement = document.querySelector('.paystack-button') as HTMLElement | null;
    if (paystackButtonElement) {
      paystackButtonElement.click();
    } else {
      // If button is not found, revert loading state and show error
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "Could not initialize payment. Please try again.",
      });
    }
  };

  return (
    <div className="relative">
      <PaystackButton
        {...paystackProps}
        className="paystack-button opacity-0 absolute top-0 left-0 w-0 h-0 overflow-hidden"
        onSuccess={(reference) => paystackProps.onSuccess(reference)}
        onClose={paystackProps.onClose}
      />
      
      <Button
        variant={variant}
        className={className}
        onClick={handlePaymentInitiation}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Processing...
          </span>
        ) : buttonText}
      </Button>
    </div>
  );
};

export default PaystackPayment;
