
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, X, Minimize, Maximize, Bot } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent' | 'ai';
  timestamp: Date;
  aiPersona?: string;
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today with interview preparation?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate typing
    setIsTyping(true);
    
    // Process the message with AI
    processMessageWithAI(newMessage);
  };

  const processMessageWithAI = (userMessage: string) => {
    // Store the actual user message
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Better response mapping based on specific user questions
    setTimeout(() => {
      setIsTyping(false);
      
      let aiResponse: string;
      
      // Interview practice related questions
      if (lowercaseMessage.includes('how do i practice') || lowercaseMessage.includes('start interview')) {
        aiResponse = "To practice interviews, go to the 'Practice Interview' tab. You can choose between a one-on-one interview or a panel interview with multiple interviewers. You can also select your job role to get tailored questions.";
      } 
      // Panel interview questions
      else if (lowercaseMessage.includes('panel interview') || lowercaseMessage.includes('multiple interviewers')) {
        aiResponse = "Our panel interview feature simulates a real panel interview with 5 different interviewers, each with their own role and questioning style. They'll introduce themselves and ask questions related to their expertise. You can find this option in the Practice tab.";
      } 
      // Question bank related
      else if (lowercaseMessage.includes('question bank') || lowercaseMessage.includes('practice questions')) {
        aiResponse = "Our question bank contains hundreds of questions across different categories, roles, and companies. You can access it from the 'Question Bank' tab. You can filter questions by company, role, and category, and even add your own custom questions.";
      } 
      // Resume related
      else if (lowercaseMessage.includes('resume') || lowercaseMessage.includes('cv')) {
        aiResponse = "Our resume builder helps you create ATS-optimized resumes and cover letters. You can also get AI feedback on your existing resume. Access it from the 'Resume Builder' section in the navigation menu.";
      } 
      // Scheduling related
      else if (lowercaseMessage.includes('schedule') || lowercaseMessage.includes('calendar')) {
        aiResponse = "You can schedule your practice interview sessions using our calendar feature in the 'Schedule Sessions' tab. This helps you maintain a consistent preparation routine and track your progress.";
      }
      // Feedback related
      else if (lowercaseMessage.includes('feedback') || lowercaseMessage.includes('how did i do')) {
        aiResponse = "After completing interview practice sessions, you can view detailed feedback in the 'Results' section. The feedback includes analysis of your answers, suggestions for improvement, and comparison with ideal responses.";
      }
      // Company-specific interview questions
      else if (lowercaseMessage.includes('google') || lowercaseMessage.includes('amazon') || 
               lowercaseMessage.includes('microsoft') || lowercaseMessage.includes('meta')) {
        const company = lowercaseMessage.includes('google') ? 'Google' : 
                       lowercaseMessage.includes('amazon') ? 'Amazon' : 
                       lowercaseMessage.includes('microsoft') ? 'Microsoft' : 'Meta';
        aiResponse = `For ${company}-specific interview questions, go to the Question Bank tab and filter by company name. We have curated questions that are frequently asked at ${company} interviews based on real candidate experiences.`;
      }
      // Technical interviews
      else if (lowercaseMessage.includes('technical interview') || lowercaseMessage.includes('coding')) {
        aiResponse = "Our platform offers technical interview preparation with coding challenges, system design questions, and algorithm problems. In the Question Bank, filter by the 'Technical' category to practice these questions.";
      }
      // Behavioral interviews
      else if (lowercaseMessage.includes('behavioral') || lowercaseMessage.includes('soft skills')) {
        aiResponse = "For behavioral interview questions, use the Question Bank and filter by 'Behavioral' category. These questions focus on your past experiences and how you handled different situations. We also provide STAR method guidance for structuring your answers.";
      }
      // Help with answering specific questions
      else if (lowercaseMessage.includes('how to answer') || lowercaseMessage.includes('tell me about yourself')) {
        aiResponse = "To get guidance on answering specific interview questions, browse our Question Bank which includes sample answers and tips. You can also practice your responses in the Interview Simulator and receive AI feedback on your answers.";
      }
      // Custom question creation
      else if (lowercaseMessage.includes('create question') || lowercaseMessage.includes('add question')) {
        aiResponse = "You can create custom interview questions in the Question Bank tab. Click on the 'Add Question' button, fill in the details including question text, category, difficulty, and any relevant tags or company information.";
      }
      // Default response for other queries
      else {
        aiResponse = "I'm your PrepWise assistant, and I can help with interview preparation, resume building, practice questions, scheduling sessions, and more. Could you please be more specific about what you need help with?";
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Notify user with sound
      const audio = new Audio('/message.mp3');
      audio.play().catch(err => console.log('Audio play failed:', err));
    }, 1000 + Math.random() * 1000); // Randomized response time for realism
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-interview-primary hover:bg-interview-secondary shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 z-50 ${
        isMinimized ? 'h-14' : 'h-96'
      }`}
    >
      <div className="flex items-center justify-between bg-interview-primary text-white p-3 rounded-t-lg">
        <div className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          <span className="font-medium">PrepWise Support</span>
        </div>
        <div className="flex items-center">
          {isMinimized ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-white hover:bg-interview-secondary"
              onClick={() => setIsMinimized(false)}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-white hover:bg-interview-secondary"
              onClick={() => setIsMinimized(true)}
            >
              <Minimize className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-white hover:bg-interview-secondary"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          <div className="flex-grow overflow-y-auto p-3 bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`rounded-lg px-3 py-2 max-w-[85%] ${
                    message.sender === 'user' 
                      ? 'bg-interview-primary text-white' 
                      : message.sender === 'ai'
                        ? 'bg-purple-100 text-gray-800 border border-purple-200'
                        : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center mb-1 text-xs text-purple-600 font-medium">
                      <Bot className="h-3 w-3 mr-1" />
                      AI Assistant
                    </div>
                  )}
                  {message.aiPersona && (
                    <div className="text-xs font-medium mb-1 text-blue-600">
                      {message.aiPersona}
                    </div>
                  )}
                  <div className="text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.sender === 'user' 
                      ? 'text-gray-200' 
                      : message.sender === 'ai' 
                        ? 'text-purple-400' 
                        : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="typing-dot"></div>
                    <div className="typing-dot animation-delay-200"></div>
                    <div className="typing-dot animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t border-gray-200">
            <div className="flex">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about interviews, questions, or resume help..."
                className="min-h-[60px] flex-grow resize-none mr-2"
              />
              <Button 
                onClick={handleSendMessage}
                className="h-[60px] bg-interview-primary hover:bg-interview-secondary"
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LiveChat;
