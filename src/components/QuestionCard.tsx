
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Bookmark, BookmarkCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface QuestionCardProps {
  question: {
    id: number;
    category: string;
    text: string;
    tips: string[];
  };
  onSave?: (questionId: number, isSaved: boolean) => void;
  isSaved?: boolean;
}

const QuestionCard = ({ question, onSave, isSaved: propIsSaved }: QuestionCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(propIsSaved || false);
  const navigate = useNavigate();

  // Update bookmarked state when prop changes
  useEffect(() => {
    if (propIsSaved !== undefined) {
      setBookmarked(propIsSaved);
    }
  }, [propIsSaved]);

  const handleBookmarkToggle = () => {
    const newBookmarkedState = !bookmarked;
    setBookmarked(newBookmarkedState);
    
    if (onSave) {
      onSave(question.id, newBookmarkedState);
    }
    
    toast({
      title: newBookmarkedState ? "Question saved" : "Question removed",
      description: newBookmarkedState 
        ? "This question has been added to your saved items." 
        : "This question has been removed from your saved items."
    });
  };

  const handlePracticeClick = () => {
    // Navigate to the interview page with the question type as a parameter
    navigate(`/interview?type=${question.category.toLowerCase()}`);
  };

  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <div className="inline-block mb-2 px-2.5 py-0.5 rounded-full bg-interview-light text-interview-primary text-xs font-medium">
            {question.category}
          </div>
          <CardTitle className="text-lg font-medium text-gray-900">{question.text}</CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleBookmarkToggle}
          className="text-gray-400 hover:text-interview-primary"
        >
          {bookmarked ? (
            <BookmarkCheck className="h-5 w-5" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </Button>
      </CardHeader>
      
      <CardContent>
        {expanded && (
          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Tips:</h5>
            <ul className="space-y-2">
              {question.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-2">•</div>
                  <span className="text-sm text-gray-600">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-4 flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-interview-primary"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                Hide Tips <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Show Tips <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
          
          <Button 
            size="sm" 
            className="bg-interview-primary hover:bg-interview-secondary text-white"
            onClick={handlePracticeClick}
          >
            Practice This
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
