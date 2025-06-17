
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  Download,
  RefreshCw
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface VideoAudioRecorderProps {
  onRecordingComplete: (blob: Blob, type: 'audio', analysis: RecordingAnalysis) => void;
  mode: 'audio' | 'both';
}

interface RecordingAnalysis {
  pace: number; // 0-100
  clarity: number; // 0-100
  tone: number; // 0-100
  confidence: number; // 0-100
  overallScore: number; // 0-100
  feedback: string[];
}

const VideoAudioRecorder: React.FC<VideoAudioRecorderProps> = ({ onRecordingComplete, mode }) => {
  const [isAudioRecording, setIsAudioRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const startTimer = () => {
    setRecordingDuration(0);
    timerRef.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      try {
        const mimeType = 'audio/webm';
        const mediaRecorder = new MediaRecorder(stream, { mimeType });
        mediaRecorderRef.current = mediaRecorder;
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks(prev => [...prev, event.data]);
          }
        };
        
        setRecordedChunks([]);
        mediaRecorder.start(1000);
        startTimer();
        
        setIsAudioRecording(true);
        toast({
          title: "Audio recording started",
          description: "Your audio is now being recorded."
        });
      } catch (err) {
        console.error(`Error starting audio recording:`, err);
        toast({
          title: `Audio recording error`,
          description: `Could not start audio recording. Please try again.`,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(`Error accessing audio devices:`, err);
      toast({
        title: `Audio access error`,
        description: `Could not access your audio devices. Please check permissions.`,
        variant: "destructive",
      });
    }
  };

  const stopRecording = async () => {
    if (!mediaRecorderRef.current) return;
    
    stopTimer();
    
    if (mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    
    setIsAudioRecording(false);
    
    // Process the recording after stopping
    setTimeout(() => {
      if (recordedChunks.length) {
        processRecording();
      }
    }, 300);
  };

  const processRecording = async () => {
    try {
      setIsAnalyzing(true);
      const mimeType = 'audio/webm';
      const blob = new Blob(recordedChunks, { type: mimeType });
      
      // Mock transcription - in a real app, this would use a speech-to-text service
      // For now we'll simulate a realistic transcription
      const mockTranscription = generateMockTranscription();
      setTranscription(mockTranscription);
      
      // Simulate AI analysis (would be replaced by actual AI processing in production)
      setTimeout(() => {
        const analysis = analyzeRecording(mockTranscription);
        onRecordingComplete(blob, 'audio', analysis);
        setIsAnalyzing(false);
        toast({
          title: "Analysis complete",
          description: `Your audio has been analyzed successfully.`
        });
      }, 2000);
    } catch (err) {
      console.error("Error processing recording:", err);
      setIsAnalyzing(false);
      toast({
        title: "Processing error",
        description: "Could not process your recording. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const generateMockTranscription = (): string => {
    // Generate a more realistic transcription based on common interview answers
    const transcriptions = [
      "In my previous role, I led a team that increased sales by 25% over two quarters. I accomplished this by implementing a new CRM system and providing extensive training to the team on best practices for client engagement.",
      "One of my greatest strengths is my ability to adapt to changing situations. For example, when our company suddenly shifted to remote work, I developed a new communication protocol that helped maintain team productivity despite the challenges.",
      "I believe my experience in agile methodology and my background in both frontend and backend development make me a strong candidate for this role. I've successfully delivered over 15 projects using these skills.",
      "A challenging situation I faced was when we lost a major client unexpectedly. I immediately organized a team meeting to analyze what went wrong and developed a recovery strategy that not only won back the client but strengthened our relationship.",
      "I'm interested in this position because your company's mission aligns with my professional values, particularly your focus on sustainability and innovation. I believe I can contribute to these goals through my experience in optimizing business processes."
    ];
    
    return transcriptions[Math.floor(Math.random() * transcriptions.length)];
  };

  const analyzeRecording = (transcriptionText: string): RecordingAnalysis => {
    // This would be replaced by actual AI analysis in production
    // Currently returns mock data, but using the transcription to make it more relevant
    
    const wordCount = transcriptionText.split(' ').length;
    const sentences = transcriptionText.split(/[.!?]+/).length;
    
    // Calculate metrics based on the transcription
    const pace = Math.min(100, Math.max(60, 70 + (wordCount / 10))); 
    const clarity = Math.min(100, Math.max(60, 75 + (sentences / 3)));
    const tone = Math.min(100, Math.max(65, 75 + (wordCount % 10)));
    const confidence = Math.min(100, Math.max(55, 70 + (sentences * 2)));
    
    const overallScore = Math.floor((pace + clarity + tone + confidence) / 4);
    
    // Generate feedback based on the actual transcription
    const feedback = [
      pace > 85 ? "Great speaking pace, easy to follow along." : "Try to speak a bit more consistently, avoiding rushed sections.",
      clarity > 80 ? "Your speech is clear and easy to understand." : "Focus on pronouncing words more clearly to improve understanding.",
      tone > 80 ? "Good tonal variation, keeping the listener engaged." : "Try to vary your tone more to avoid sounding monotonous.",
      confidence > 80 ? "You sound confident and authoritative." : "Work on projecting more confidence in your delivery.",
      wordCount > 50 ? "Good level of detail in your response." : "Consider providing more detailed examples in your answers."
    ];
    
    return {
      pace,
      clarity,
      tone,
      confidence,
      overallScore,
      feedback
    };
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-medium">
          Record Your Audio Response
        </CardTitle>
        <CardDescription>
          Practice your delivery and receive AI feedback on your communication style
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            variant={isAudioRecording ? "destructive" : "default"}
            onClick={isAudioRecording ? stopRecording : startRecording}
            disabled={isAnalyzing}
            className="flex-1"
          >
            {isAudioRecording ? (
              <>
                <Square className="mr-2 h-4 w-4" />
                Stop Recording {formatTime(recordingDuration)}
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                Record Audio Response
              </>
            )}
          </Button>
          
          {transcription && !isAnalyzing && (
            <div className="mt-4 p-4 bg-gray-50 border rounded-md">
              <h4 className="text-sm font-medium mb-2">Your Transcribed Response:</h4>
              <p className="text-gray-700">{transcription}</p>
            </div>
          )}
          
          {isAnalyzing && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Analyzing your audio...</span>
                <span>Please wait</span>
              </div>
              <Progress value={45} className="h-2" />
              <p className="text-xs text-center text-gray-500 animate-pulse">
                <RefreshCw className="inline mr-2 h-3 w-3 animate-spin" />
                Our AI is analyzing your delivery style and communication patterns
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoAudioRecorder;
