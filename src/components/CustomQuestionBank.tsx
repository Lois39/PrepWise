import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Plus, 
  Building,
  File, 
  Save, 
  X,
  FileUp,
  Download,
  Briefcase,
  Tag
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Question {
  id: string;
  text: string;
  company?: string;
  role?: string;
  category: string;
  source?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

// Sample common companies
const commonCompanies = [
  'Google', 'Amazon', 'Microsoft', 'Apple', 'Meta', 'Netflix', 'Salesforce',
  'Adobe', 'IBM', 'Oracle', 'Intel', 'Uber', 'Airbnb', 'Twitter', 'LinkedIn'
];

// Sample roles
const commonRoles = [
  'Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer',
  'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'QA Engineer',
  'Project Manager', 'Technical Writer', 'Marketing Manager', 'Sales Manager'
];

const initialQuestions: Question[] = [
  {
    id: '1',
    text: 'Explain Google\'s approach to distributed systems and how you would design a similar system.',
    company: 'Google',
    role: 'Software Engineer',
    category: 'Technical',
    difficulty: 'hard',
    tags: ['System Design', 'Distributed Systems']
  },
  {
    id: '2',
    text: 'How would you design Amazon\'s recommendation engine?',
    company: 'Amazon',
    role: 'Data Scientist',
    category: 'Technical',
    difficulty: 'hard',
    tags: ['Machine Learning', 'Algorithms']
  },
  {
    id: '3',
    text: 'Describe a situation where you had to make an important decision with incomplete information at Microsoft.',
    company: 'Microsoft',
    role: 'Product Manager',
    category: 'Behavioral',
    difficulty: 'medium',
    tags: ['Decision Making', 'Leadership']
  },
  {
    id: '4',
    text: 'How would you improve Google\'s search algorithm to better handle ambiguous queries?',
    company: 'Google',
    role: 'Software Engineer',
    category: 'Technical',
    difficulty: 'hard',
    tags: ['Algorithms', 'Search', 'NLP']
  },
  {
    id: '5',
    text: 'Describe Amazon\'s leadership principles and how you\'ve demonstrated them in your previous roles.',
    company: 'Amazon',
    role: 'Software Engineer',
    category: 'Behavioral',
    difficulty: 'medium',
    tags: ['Leadership', 'Company Values']
  }
];

interface CustomQuestionBankProps {
  onSelectQuestion?: (question: Question) => void;
  jobRole?: string;
}

const CustomQuestionBank: React.FC<CustomQuestionBankProps> = ({ 
  onSelectQuestion,
  jobRole
}) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(initialQuestions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('_all');
  const [selectedRole, setSelectedRole] = useState<string>(jobRole || '_all');
  const [selectedCategory, setSelectedCategory] = useState<string>('_all');
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    text: '',
    company: 'none',
    role: jobRole || 'none',
    category: 'Behavioral',
    difficulty: 'medium',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  
  useEffect(() => {
    filterQuestions();
  }, [searchTerm, selectedCompany, selectedRole, selectedCategory, questions]);
  
  useEffect(() => {
    if (jobRole) {
      setSelectedRole(jobRole);
      setNewQuestion(prev => ({ ...prev, role: jobRole }));
    }
  }, [jobRole]);
  
  const filterQuestions = () => {
    let filtered = [...questions];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(q => 
        q.text.toLowerCase().includes(term) ||
        (q.company && q.company.toLowerCase().includes(term)) ||
        (q.role && q.role.toLowerCase().includes(term)) ||
        q.category.toLowerCase().includes(term) ||
        (q.tags && q.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    if (selectedCompany && selectedCompany !== '_all') {
      filtered = filtered.filter(q => q.company === selectedCompany);
    }
    
    if (selectedRole && selectedRole !== '_all') {
      filtered = filtered.filter(q => q.role === selectedRole);
    }
    
    if (selectedCategory && selectedCategory !== '_all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    
    setFilteredQuestions(filtered);
  };
  
  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) {
      toast({
        title: "Error",
        description: "Question text cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const question: Question = {
      id: Date.now().toString(),
      text: newQuestion.text,
      company: newQuestion.company,
      role: newQuestion.role,
      category: newQuestion.category || 'Behavioral',
      difficulty: newQuestion.difficulty || 'medium',
      tags: newQuestion.tags || [],
      source: 'User Created'
    };
    
    setQuestions(prev => [...prev, question]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Question Added",
      description: "Your custom question has been added to the bank.",
    });
    
    // Reset form
    setNewQuestion({
      text: '',
      company: 'none',
      role: selectedRole || jobRole || 'none',
      category: 'Behavioral',
      difficulty: 'medium',
      tags: []
    });
  };
  
  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    setNewQuestion(prev => ({
      ...prev,
      tags: [...(prev.tags || []), newTag.trim()]
    }));
    
    setNewTag('');
  };
  
  const removeTag = (tagToRemove: string) => {
    setNewQuestion(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleImport = () => {
    // In a real implementation, this would handle CSV or text file parsing
    // For now, we'll just simulate adding some imported questions
    
    const importedQuestions: Question[] = [
      {
        id: `imported-${Date.now()}`,
        text: 'From Glassdoor: How would you handle a situation where a project is behind schedule?',
        company: selectedCompany === '_all' ? undefined : selectedCompany,
        role: selectedRole === '_all' ? undefined : selectedRole,
        category: 'Behavioral',
        source: 'Glassdoor Import',
        tags: ['Time Management', 'Project Management']
      },
      {
        id: `imported-${Date.now() + 1}`,
        text: 'From Glassdoor: Describe a time when you had to give difficult feedback to a team member.',
        company: selectedCompany === '_all' ? undefined : selectedCompany,
        role: selectedRole === '_all' ? undefined : selectedRole,
        category: 'Behavioral',
        source: 'Glassdoor Import',
        tags: ['Communication', 'Leadership']
      }
    ];
    
    setQuestions(prev => [...prev, ...importedQuestions]);
    setIsImportDialogOpen(false);
    
    toast({
      title: "Questions Imported",
      description: `${importedQuestions.length} questions have been imported.`,
    });
  };
  
  const exportQuestions = () => {
    // In a real implementation, this would export to CSV or another format
    // For now, we'll just show a toast message
    
    toast({
      title: "Questions Exported",
      description: `${filteredQuestions.length} questions have been exported.`,
    });
  };
  
  return (
    <Card className="border-interview-light shadow-md">
      <CardHeader className="bg-gradient-to-r from-interview-primary/10 to-interview-light">
        <CardTitle>Customizable Question Bank</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search questions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="mr-1 h-4 w-4" /> 
                Add Question
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center"
                onClick={() => setIsImportDialogOpen(true)}
              >
                <FileUp className="mr-1 h-4 w-4" />
                Import
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center"
                onClick={exportQuestions}
              >
                <Download className="mr-1 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by company" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">All Companies</SelectItem>
                {commonCompanies.map((company) => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">All Roles</SelectItem>
                {commonRoles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">All Categories</SelectItem>
                <SelectItem value="Behavioral">Behavioral</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Situational">Situational</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4 mt-6">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium mb-2">{question.text}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {question.company && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                              <Building className="h-3 w-3 mr-1" /> {question.company}
                            </Badge>
                          )}
                          
                          {question.role && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                              <Briefcase className="h-3 w-3 mr-1" /> {question.role}
                            </Badge>
                          )}
                          
                          <Badge variant="outline" className={
                            question.category === 'Behavioral' ? "bg-purple-50 text-purple-700 hover:bg-purple-100" :
                            question.category === 'Technical' ? "bg-orange-50 text-orange-700 hover:bg-orange-100" :
                            "bg-teal-50 text-teal-700 hover:bg-teal-100"
                          }>
                            {question.category}
                          </Badge>
                          
                          {question.difficulty && (
                            <Badge variant="outline" className={
                              question.difficulty === 'easy' ? "bg-green-50 text-green-700 hover:bg-green-100" :
                              question.difficulty === 'medium' ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100" :
                              "bg-red-50 text-red-700 hover:bg-red-100"
                            }>
                              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                            </Badge>
                          )}
                          
                          {question.source && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-100">
                              <File className="h-3 w-3 mr-1" /> {question.source}
                            </Badge>
                          )}
                        </div>
                        
                        {question.tags && question.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {question.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {onSelectQuestion && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-1"
                          onClick={() => onSelectQuestion(question)}
                        >
                          Use
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No questions found matching your filters.</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCompany('_all');
                    setSelectedRole(jobRole || '_all');
                    setSelectedCategory('_all');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      {/* Add Question Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Question</DialogTitle>
            <DialogDescription>
              Create a new question tailored to your target company or role.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="questionText" className="text-sm font-medium">Question Text</label>
              <Textarea
                id="questionText"
                placeholder="Enter your question here..."
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                rows={3}
                className="resize-none"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">Company (Optional)</label>
                <Select 
                  value={newQuestion.company} 
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, company: value })}
                >
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {commonCompanies.map((company) => (
                      <SelectItem key={company} value={company}>{company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">Role (Optional)</label>
                <Select 
                  value={newQuestion.role} 
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, role: value })}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {commonRoles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select 
                  value={newQuestion.category} 
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Behavioral">Behavioral</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Situational">Situational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="difficulty" className="text-sm font-medium">Difficulty</label>
                <Select 
                  value={newQuestion.difficulty} 
                  onValueChange={(value) => 
                    setNewQuestion({ 
                      ...newQuestion, 
                      difficulty: value as 'easy' | 'medium' | 'hard' 
                    })
                  }
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">Tags</label>
              <div className="flex space-x-2">
                <Input
                  id="tags"
                  placeholder="Add tags (e.g., Leadership)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                >
                  Add
                </Button>
              </div>
              
              {newQuestion.tags && newQuestion.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {newQuestion.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleAddQuestion}
              disabled={!newQuestion.text.trim()}
              className="bg-interview-primary hover:bg-interview-secondary"
            >
              <Save className="mr-2 h-4 w-4" /> Save Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Questions</DialogTitle>
            <DialogDescription>
              Import interview questions from external sources like Glassdoor.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Tabs defaultValue="glassdoor">
              <TabsList className="w-full">
                <TabsTrigger value="glassdoor" className="flex-1">Glassdoor</TabsTrigger>
                <TabsTrigger value="csv" className="flex-1">CSV Upload</TabsTrigger>
                <TabsTrigger value="text" className="flex-1">Text Input</TabsTrigger>
              </TabsList>
              
              <TabsContent value="glassdoor" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Select 
                      value={selectedCompany} 
                      onValueChange={setSelectedCompany}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select company to import from" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonCompanies.map((company) => (
                          <SelectItem key={company} value={company}>{company}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Select 
                      value={selectedRole} 
                      onValueChange={setSelectedRole}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonRoles.map((role) => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
                    <p>Note: This feature simulates importing questions from Glassdoor. In a production environment, this would fetch real questions from the selected company and role.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="csv" className="pt-4">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <FileUp className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Drag and drop a CSV file or click to browse</p>
                      <Button variant="outline" size="sm">Browse Files</Button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>CSV format requires columns: Question, Category, Company (optional), Role (optional), Difficulty (optional), Tags (comma-separated)</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="text" className="pt-4">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Paste questions here (one per line)"
                    rows={6}
                    className="resize-none"
                  />
                  
                  <div className="text-sm text-gray-600">
                    <p>For best results, enter one question per line. You can add metadata in brackets, e.g., "Tell me about yourself [Behavioral, Amazon, PM]"</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleImport}
              className="bg-interview-primary hover:bg-interview-secondary"
            >
              <FileUp className="mr-2 h-4 w-4" /> Import Questions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CustomQuestionBank;
