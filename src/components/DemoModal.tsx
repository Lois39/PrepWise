
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] dialog-content">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gray-700">PrepWise Demo</DialogTitle>
          <DialogDescription className="text-gray-500">
            See how our AI-powered interview preparation platform works
          </DialogDescription>
        </DialogHeader>
        
        <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="PrepWise Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600 mb-4">
            Ready to improve your interview skills? Sign up and start practicing today.
          </p>
          <Button className="bg-interview-primary hover:bg-interview-secondary text-white" onClick={onClose}>
            Get Started
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
