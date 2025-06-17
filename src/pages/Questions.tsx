
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuestionCard from '../components/QuestionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowDownAZ, 
  ArrowUpAZ,
  X
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const questionData = [
  {
    id: 1,
    category: 'Behavioral',
    text: 'Tell me about a time when you had to deal with a difficult team member.',
    tips: [
      'Use the STAR method: Situation, Task, Action, Result',
      'Focus on how you resolved the conflict constructively',
      'Highlight communication and interpersonal skills',
      'Avoid speaking negatively about the other person'
    ]
  },
  {
    id: 2,
    category: 'Behavioral',
    text: 'Describe a project where you demonstrated leadership skills.',
    tips: [
      'Clearly outline your specific role and responsibilities',
      'Explain how you motivated and guided the team',
      'Highlight the outcomes and what you learned',
      'Include challenges you overcame as a leader'
    ]
  },
  {
    id: 3,
    category: 'Technical',
    text: 'How would you design a scalable web application architecture?',
    tips: [
      'Discuss front-end, back-end, and database considerations',
      'Address scalability, security, and performance',
      'Mention specific technologies and why you would choose them',
      'Talk about monitoring and maintenance approaches'
    ]
  },
  {
    id: 4,
    category: 'Technical',
    text: 'Explain how you would debug a complex software issue.',
    tips: [
      'Describe your systematic troubleshooting approach',
      'Mention tools and techniques you would use',
      'Explain how you would isolate the problem',
      'Discuss how you would verify the solution works'
    ]
  },
  {
    id: 5,
    category: 'Situational',
    text: 'How would you handle conflicting priorities from different stakeholders?',
    tips: [
      'Emphasize your communication and negotiation skills',
      'Discuss your approach to prioritizing tasks',
      'Explain how you would find common ground',
      'Give an example of successful stakeholder management if possible'
    ]
  },
  {
    id: 6,
    category: 'Situational',
    text: 'What would you do if you realized a project was going to miss its deadline?',
    tips: [
      'Focus on proactive communication and transparency',
      'Outline the steps you would take to mitigate the issue',
      'Discuss how you would reprioritize tasks',
      'Address how you would prevent similar situations in future'
    ]
  },
];

type SortOption = 'default' | 'az' | 'za';

const Questions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filteredQuestions, setFilteredQuestions] = useState(questionData);
  const [savedQuestions, setSavedQuestions] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  
  // Load saved questions from localStorage on component mount
  useEffect(() => {
    const savedIds = localStorage.getItem('savedQuestions');
    if (savedIds) {
      setSavedQuestions(JSON.parse(savedIds));
    }
  }, []);

  // Save to localStorage whenever savedQuestions changes
  useEffect(() => {
    localStorage.setItem('savedQuestions', JSON.stringify(savedQuestions));
  }, [savedQuestions]);

  // Filter and sort questions whenever search term, active tab, or sort option changes
  useEffect(() => {
    let result = [...questionData];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(q => 
        q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by tab/category
    if (activeTab !== 'all' && activeTab !== 'saved') {
      result = result.filter(q => q.category.toLowerCase() === activeTab.toLowerCase());
    } else if (activeTab === 'saved') {
      result = result.filter(q => savedQuestions.includes(q.id));
    }
    
    // Apply sorting
    if (sortOption === 'az') {
      result.sort((a, b) => a.text.localeCompare(b.text));
    } else if (sortOption === 'za') {
      result.sort((a, b) => b.text.localeCompare(a.text));
    }
    
    setFilteredQuestions(result);
  }, [searchTerm, activeTab, sortOption, savedQuestions]);

  const handleSaveQuestion = (questionId: number, isSaved: boolean) => {
    if (isSaved) {
      setSavedQuestions(prev => [...prev, questionId]);
    } else {
      setSavedQuestions(prev => prev.filter(id => id !== questionId));
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="interview-container">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Question Bank</h1>
            <p className="text-xl text-gray-600">Browse and prepare for common interview questions</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search questions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleClearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" /> 
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setActiveTab('all')}>
                  All Categories
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('behavioral')}>
                  Behavioral
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('technical')}>
                  Technical
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('situational')}>
                  Situational
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortOption('default')}>
                  Default Order
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('az')}>
                  <ArrowDownAZ className="mr-2 h-4 w-4" /> A to Z
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('za')}>
                  <ArrowUpAZ className="mr-2 h-4 w-4" /> Z to A
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Questions</TabsTrigger>
              <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="situational">Situational</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              {filteredQuestions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredQuestions.map((question) => (
                    <QuestionCard 
                      key={question.id} 
                      question={question} 
                      onSave={handleSaveQuestion}
                      isSaved={savedQuestions.includes(question.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    {activeTab === 'saved' 
                      ? "You haven't saved any questions yet." 
                      : "No questions match your search criteria."}
                  </p>
                  {activeTab === 'saved' && (
                    <Button 
                      className="mt-4 bg-interview-primary hover:bg-interview-secondary text-white"
                      onClick={() => setActiveTab('all')}
                    >
                      Browse Questions
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Questions;
