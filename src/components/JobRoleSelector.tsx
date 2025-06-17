
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  BriefcaseBusiness, 
  Code2, 
  BarChart3, 
  UserCog, 
  Presentation, 
  Building, 
  ShieldCheck,
  Search
} from 'lucide-react';

interface JobRoleSelectorProps {
  onSelectRole: (role: string) => void;
}

const commonRoles = [
  { id: 'software-engineer', name: 'Software Engineer', icon: <Code2 className="h-10 w-10" /> },
  { id: 'product-manager', name: 'Product Manager', icon: <BriefcaseBusiness className="h-10 w-10" /> },
  { id: 'data-analyst', name: 'Data Analyst', icon: <BarChart3 className="h-10 w-10" /> },
  { id: 'ux-designer', name: 'UX Designer', icon: <UserCog className="h-10 w-10" /> },
  { id: 'marketing-manager', name: 'Marketing Manager', icon: <Presentation className="h-10 w-10" /> },
  { id: 'business-analyst', name: 'Business Analyst', icon: <Building className="h-10 w-10" /> },
  { id: 'project-manager', name: 'Project Manager', icon: <ShieldCheck className="h-10 w-10" /> },
];

const JobRoleSelector: React.FC<JobRoleSelectorProps> = ({ onSelectRole }) => {
  const [customRole, setCustomRole] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredRoles = searchTerm 
    ? commonRoles.filter(role => role.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : commonRoles;

  const handleCustomRoleSubmit = () => {
    if (customRole.trim()) {
      onSelectRole(customRole.trim());
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">What role are you interviewing for?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search common roles..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredRoles.map((role) => (
              <Button
                key={role.id}
                variant="outline"
                className="h-auto py-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-interview-primary transition-all"
                onClick={() => onSelectRole(role.name)}
              >
                <div className="text-interview-primary mb-2">{role.icon}</div>
                <span>{role.name}</span>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <p className="text-sm font-medium mb-3">Don't see your role? Enter it below:</p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your job role..."
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomRoleSubmit()}
            />
            <Button 
              onClick={handleCustomRoleSubmit}
              disabled={!customRole.trim()}
              className="bg-interview-primary hover:bg-interview-secondary text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobRoleSelector;
