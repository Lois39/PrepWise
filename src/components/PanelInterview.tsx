import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { User, Clock, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

// Expanded personas for the panel interview with more detailed questions
const interviewerPersonas = [
  {
    id: 1,
    name: 'Alex Chen',
    role: 'Technical Lead',
    avatar: '/placeholder.svg',
    style: 'Technical and detailed',
    introduction: "I'm Alex Chen, the Technical Lead for this project. I'll be focusing on assessing your technical skills and problem-solving abilities.",
    questions: [
      'Walk me through your approach to debugging a complex issue in a large codebase.',
      'How do you ensure your code is maintainable for other team members?',
      'Describe a time when you had to make a technical decision with incomplete information.',
      'How do you stay updated with the latest technologies in your field?',
      'Tell me about your experience with CI/CD pipelines.',
      'What metrics do you use to evaluate code quality?',
      'How do you approach refactoring legacy code?',
      'Explain how you would handle a situation where requirements change mid-development.',
      'What version control strategies have you found most effective when working in large teams?',
      'How do you balance technical debt with delivery deadlines?'
    ]
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'HR Manager',
    avatar: '/placeholder.svg',
    style: 'People-focused and behavioral',
    introduction: "I'm Sarah Johnson from Human Resources. I'd like to learn more about how you work with others and handle workplace challenges.",
    questions: [
      'Tell me about a time you had a conflict with a team member and how you resolved it.',
      'How do you handle situations where you have to meet tight deadlines?',
      'What is your approach to giving and receiving feedback?',
      'Describe a situation where you had to adapt to a significant change at work.',
      'How do you prioritize tasks when everything seems urgent?',
      'What strategies do you use to maintain work-life balance during busy periods?',
      'Tell me about a time you helped a colleague who was struggling.',
      'How do you approach learning new skills that are outside your comfort zone?',
      'Describe your ideal work environment and management style.',
      'How have you handled failure in your past roles?'
    ]
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    avatar: '/placeholder.svg',
    style: 'Strategic and business-oriented',
    introduction: "Hi, I'm Michael Rodriguez, the Product Manager. I'm interested in understanding how you align your work with business objectives and user needs.",
    questions: [
      'How do you align technical implementations with business objectives?',
      'Tell me about a project where you had to pivot based on user feedback.',
      'How do you prioritize features when resources are constrained?',
      'Describe a time when you had to communicate a complex technical concept to non-technical stakeholders.',
      "How do you measure the success of a product feature you've implemented?",
      'What methods do you use to gather and incorporate user feedback?',
      'How do you balance innovation with reliability in product development?',
      'Tell me about a time when data influenced your decision-making process.',
      'How do you approach building products for diverse user groups?',
      'What strategies do you use to keep projects on track when facing obstacles?'
    ]
  },
  {
    id: 4,
    name: 'Jamie Williams',
    role: 'Senior Software Architect',
    avatar: '/placeholder.svg',
    style: 'Systems-oriented and analytical',
    introduction: "Hello, I'm Jamie Williams, Senior Software Architect. I'll be asking about your experience with system design and architectural decisions.",
    questions: [
      'How would you design a system that needs to handle millions of concurrent users?',
      'Describe your approach to microservices versus monolithic architectures.',
      'What considerations do you make when designing for scalability?',
      'How do you approach database design for applications with complex data relationships?',
      "Tell me about a time you improved a system's performance significantly.",
      'How do you ensure security is built into your architecture from the start?',
      'What strategies do you use for effective error handling and resilience?',
      'How do you approach API design and versioning?',
      'Describe how you would architect a real-time collaborative application.',
      'What factors do you consider when choosing between different technology stacks?'
    ]
  },
  {
    id: 5,
    name: 'Taylor Singh',
    role: 'Senior QA Engineer',
    avatar: '/placeholder.svg',
    style: 'Detail-oriented and quality-focused',
    introduction: "I'm Taylor Singh from the Quality Assurance team. I'd like to understand your approach to quality and testing.",
    questions: [
      'How do you incorporate testing into your development workflow?',
      'What types of automated tests do you write and in what situations?',
      'How do you approach bug triage and prioritization?',
      'Tell me about a particularly challenging bug you solved.',
      'How do you ensure accessibility in the features you develop?',
      'What tools or methods do you use to catch issues before they reach production?',
      'How would you test a feature with complex business logic?',
      'What metrics do you use to evaluate test coverage and effectiveness?',
      'How do you approach testing for edge cases?',
      'Describe your experience with performance testing and optimization.'
    ]
  }
];

interface Message {
  id: string;
  content: string;
  senderId: number;
  timestamp: Date;
  isUser: boolean;
}

interface PanelInterviewProps {
  jobRole?: string;
}

const PanelInterview: React.FC<PanelInterviewProps> = ({ jobRole = 'Software Engineer' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [currentInterviewerIndex, setCurrentInterviewerIndex] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [introductionsDone, setIntroductionsDone] = useState<number[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && remainingTime > 0) {
      timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
    } else if (remainingTime === 0) {
      completeInterview();
    }
    return () => clearTimeout(timer);
  }, [remainingTime, isTimerActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startInterview = () => {
    setInterviewStarted(true);
    setIsTimerActive(true);
    
    // Add welcome message
    const welcomeInterviewer = interviewerPersonas[0];
    addMessageFromInterviewer(
      welcomeInterviewer, 
      `Hello, and welcome to this panel interview for the ${jobRole} position. I'll be leading the panel today, and we're excited to learn more about you and your experience.`
    );
    
    // Have all interviewers introduce themselves
    setTimeout(() => {
      introduceAllInterviewers();
    }, 1500);
  };

  const introduceAllInterviewers = () => {
    let delay = 0;
    
    interviewerPersonas.forEach((interviewer, index) => {
      setTimeout(() => {
        addMessageFromInterviewer(interviewer, interviewer.introduction);
        setIntroductionsDone(prev => [...prev, interviewer.id]);
        
        // After the last introduction, ask the first question
        if (index === interviewerPersonas.length - 1) {
          setTimeout(() => {
            addMessageFromInterviewer(
              interviewerPersonas[0], 
              "Great, now let's begin with the questions. I'll go first."
            );
            
            setTimeout(() => {
              askNextQuestion();
            }, 1500);
          }, 1500);
        }
      }, delay);
      
      delay += 2000; // Add 2 seconds between each introduction
    });
  };

  const askNextQuestion = () => {
    const currentInterviewer = interviewerPersonas[currentInterviewerIndex];
    
    // Choose a question that hasn't been asked yet if possible
    const askedQuestions = messages
      .filter(m => m.senderId === currentInterviewer.id && !m.content.includes("I'm") && !m.content.includes("Hello"))
      .map(m => m.content);
      
    const availableQuestions = currentInterviewer.questions.filter(q => !askedQuestions.includes(q));
    
    // If all questions have been asked, choose a random one
    const questionPool = availableQuestions.length > 0 ? availableQuestions : currentInterviewer.questions;
    const randomIndex = Math.floor(Math.random() * questionPool.length);
    const question = questionPool[randomIndex];
    
    setCurrentQuestion(question);
    addMessageFromInterviewer(currentInterviewer, question);
  };

  const addMessageFromInterviewer = (interviewer: typeof interviewerPersonas[0], content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      content,
      senderId: interviewer.id,
      timestamp: new Date(),
      isUser: false
    };
    
    setMessages(prev => [...prev, message]);
  };

  const addUserResponse = () => {
    if (!userResponse.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      content: userResponse,
      senderId: 0, // 0 represents the user
      timestamp: new Date(),
      isUser: true
    };
    
    setMessages(prev => [...prev, message]);
    setUserResponse('');
    
    // Move to next interviewer
    const nextInterviewerIndex = (currentInterviewerIndex + 1) % interviewerPersonas.length;
    setCurrentInterviewerIndex(nextInterviewerIndex);
    
    // Small delay before next question
    setTimeout(() => {
      if (messages.length >= interviewerPersonas.length * 3) { // Allow for more exchanges
        completeInterview();
      } else {
        // Have next interviewer ask a question, with an optional transition phrase
        const nextInterviewer = interviewerPersonas[nextInterviewerIndex];
        
        const transitionPhrases = [
          "I'd like to follow up with a question.",
          "Let me ask you something related to my area.",
          "I have a question for you now.",
          "Let me change direction a bit.",
          "I'd like to hear more about your experience in a different area."
        ];
        
        const randomTransitionPhrase = transitionPhrases[Math.floor(Math.random() * transitionPhrases.length)];
        addMessageFromInterviewer(nextInterviewer, randomTransitionPhrase);
        
        setTimeout(() => {
          askNextQuestion();
        }, 1500);
      }
    }, 1000);
  };

  const completeInterview = () => {
    setInterviewComplete(true);
    setIsTimerActive(false);
    
    // Final message
    const randomInterviewer = interviewerPersonas[Math.floor(Math.random() * interviewerPersonas.length)];
    addMessageFromInterviewer(
      randomInterviewer,
      "Thank you for your time today. We have completed our panel interview questions. You will receive feedback on your performance shortly."
    );
    
    toast({
      title: "Interview Complete",
      description: "Your panel interview has been completed. View your performance in the results section.",
      duration: 5000
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addUserResponse();
    }
  };

  return (
    <Card className="border-interview-light shadow-md">
      <CardHeader className="bg-gradient-to-r from-interview-primary/10 to-interview-light">
        <CardTitle className="flex justify-between items-center">
          <span>Panel Interview Simulation - {jobRole}</span>
          {isTimerActive && (
            <span className="flex items-center text-gray-600 text-sm font-normal">
              <Clock className="h-4 w-4 mr-1" />
              Remaining: {formatTime(remainingTime)}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {!interviewStarted ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold mb-4">Prepare for Your Panel Interview</h3>
            <p className="text-gray-600 mb-6">
              You'll be interviewed by a panel of {interviewerPersonas.length} professionals with different roles and interviewing styles. 
              This simulates a real panel interview environment where you'll need to adjust your responses for different types of questions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {interviewerPersonas.map((persona) => (
                <div key={persona.id} className="text-center w-24">
                  <Avatar className="w-12 h-12 mx-auto mb-2">
                    <AvatarImage src={persona.avatar} alt={persona.name} />
                    <AvatarFallback>{persona.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium truncate">{persona.name}</div>
                  <div className="text-xs text-gray-500 truncate">{persona.role}</div>
                </div>
              ))}
            </div>
            <Button 
              onClick={startInterview}
              className="bg-interview-primary hover:bg-interview-secondary"
            >
              Start Panel Interview
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto border rounded-md p-4 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.isUser ? 'pl-8' : 'pr-8'}`}>
                  {!message.isUser && (
                    <div className="flex items-center mb-1">
                      <Avatar className="w-6 h-6 mr-2">
                        <AvatarImage 
                          src={interviewerPersonas.find(p => p.id === message.senderId)?.avatar} 
                          alt={interviewerPersonas.find(p => p.id === message.senderId)?.name}
                        />
                        <AvatarFallback>
                          {interviewerPersonas.find(p => p.id === message.senderId)?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {interviewerPersonas.find(p => p.id === message.senderId)?.name}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {interviewerPersonas.find(p => p.id === message.senderId)?.role}
                      </span>
                    </div>
                  )}
                  <div className={`p-3 rounded-md ${
                    message.isUser 
                      ? 'bg-interview-primary text-white ml-auto' 
                      : 'bg-white border'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.isUser && (
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-gray-500">You</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {!interviewComplete && (
              <div className="flex space-x-2">
                <Textarea 
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your response..."
                  disabled={interviewComplete}
                  className="flex-grow resize-none"
                  rows={3}
                />
                <Button 
                  onClick={addUserResponse} 
                  disabled={!userResponse.trim() || interviewComplete}
                  className="self-end bg-interview-primary hover:bg-interview-secondary"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {interviewComplete && (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">Interview completed. Thank you for participating.</p>
                <Button 
                  onClick={() => {
                    setMessages([]);
                    setInterviewStarted(false);
                    setInterviewComplete(false);
                    setRemainingTime(600);
                    setIntroductionsDone([]);
                  }}
                  variant="outline"
                  className="mr-2"
                >
                  Restart Interview
                </Button>
                <Button className="bg-interview-primary hover:bg-interview-secondary">
                  View Feedback
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PanelInterview;
