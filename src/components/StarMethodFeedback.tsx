
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';

interface StarMethodFeedbackProps {
  response: string;
}

const StarMethodFeedback = ({ response }: StarMethodFeedbackProps) => {
  // In a real implementation, we would analyze the response with NLP
  // For this demo, we'll use simple heuristics
  
  const situationScore = response.toLowerCase().includes('situation') || response.toLowerCase().includes('context') ? 
    { score: 4, feedback: "You clearly described the situation" } : 
    { score: 2, feedback: "Try to begin with a clear description of the situation or context" };
  
  const taskScore = response.toLowerCase().includes('task') || response.toLowerCase().includes('goal') || response.toLowerCase().includes('challenge') ? 
    { score: 4, feedback: "You outlined the task or challenge well" } : 
    { score: 1, feedback: "Make sure to explain what task you were responsible for" };
  
  const actionScore = response.toLowerCase().includes('action') || response.toLowerCase().includes('i did') || response.toLowerCase().includes('steps') ? 
    { score: 5, feedback: "Your actions were well articulated" } : 
    { score: 2, feedback: "Expand on the specific actions you took" };
  
  const resultScore = response.toLowerCase().includes('result') || response.toLowerCase().includes('outcome') || response.toLowerCase().includes('accomplishment') ? 
    { score: 4, feedback: "You highlighted the results effectively" } : 
    { score: 2, feedback: "End with the results and impact of your actions" };

  return (
    <Card className="border-l-4 border-l-interview-primary">
      <CardHeader>
        <CardTitle className="text-lg">STAR Method Analysis</CardTitle>
        <CardDescription>
          Breaking down your response using the Situation, Task, Action, Result framework
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Situation</h3>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`h-4 w-4 rounded-full ${star <= situationScore.score ? 'bg-interview-primary' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm">{situationScore.feedback}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Task</h3>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`h-4 w-4 rounded-full ${star <= taskScore.score ? 'bg-interview-primary' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm">{taskScore.feedback}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Action</h3>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`h-4 w-4 rounded-full ${star <= actionScore.score ? 'bg-interview-primary' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm">{actionScore.feedback}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Result</h3>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`h-4 w-4 rounded-full ${star <= resultScore.score ? 'bg-interview-primary' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm">{resultScore.feedback}</p>
          </div>
        </div>
        
        <div className="mt-2 p-4 bg-interview-light rounded-lg">
          <h3 className="font-medium mb-2 flex items-center">
            <Check className="h-4 w-4 mr-2 text-green-600" />
            STAR Method Example
          </h3>
          <p className="text-sm mb-2">
            <strong>Situation:</strong> While working at ABC Corp, our team faced a deadline-critical project when a key team member had to take unexpected leave.
          </p>
          <p className="text-sm mb-2">
            <strong>Task:</strong> As team lead, I needed to reorganize workloads and ensure project delivery without compromising quality or pushing deadlines.
          </p>
          <p className="text-sm mb-2">
            <strong>Action:</strong> I conducted a skills assessment of the remaining team, reprioritized tasks, and implemented daily stand-ups to monitor progress. I also cross-trained two junior members to handle some of the absent colleague's responsibilities.
          </p>
          <p className="text-sm">
            <strong>Result:</strong> We delivered the project on time with a 98% client satisfaction score. The cross-training initiative became a permanent team practice, reducing future risks from unexpected absences.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StarMethodFeedback;
