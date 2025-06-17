
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ArrowRight, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface JobDescriptionUploadProps {
  onQuestionsGenerated: (questions: any[]) => void;
}

const JobDescriptionUpload = ({ onQuestionsGenerated }: JobDescriptionUploadProps) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateQuestions = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Empty job description",
        description: "Please enter a job description to generate tailored questions.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate API call to generate questions
      setTimeout(() => {
        // Example generated questions based on job description
        const generatedQuestions = [
          {
            id: 101,
            type: 'behavioral',
            text: `Based on this job description, tell me about a time when you demonstrated ${jobDescription.includes('leadership') ? 'leadership' : 'problem-solving'} skills in a previous role.`,
            difficulty: 'intermediate' as const,
          },
          {
            id: 102,
            type: 'technical',
            text: `How would your experience align with the ${jobDescription.includes('technology') ? 'technology stack' : 'requirements'} mentioned in this job description?`,
            difficulty: 'intermediate' as const,
          },
          {
            id: 103,
            type: 'industry',
            text: `What specific industry knowledge do you have that makes you a good fit for this position?`,
            difficulty: 'advanced' as const,
          },
        ];

        onQuestionsGenerated(generatedQuestions);
        setIsGenerating(false);
        
        toast({
          title: "Questions generated",
          description: "Custom interview questions have been created based on the job description.",
        });
      }, 2000);
    } catch (error) {
      console.error("Error generating questions:", error);
      setIsGenerating(false);
      toast({
        title: "Generation failed",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-interview-primary" />
          Generate Tailored Questions
        </CardTitle>
        <CardDescription>
          Paste a job description to receive customized interview questions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste the job description here..."
          className="min-h-[150px] resize-none"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <Button 
          onClick={handleGenerateQuestions} 
          disabled={isGenerating || !jobDescription.trim()}
          className="w-full bg-interview-primary hover:bg-interview-secondary text-white"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating Questions...
            </>
          ) : (
            <>
              Generate Interview Questions <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionUpload;
