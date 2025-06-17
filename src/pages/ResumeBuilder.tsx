
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileEdit, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award,
  Download,
  Trash2,
  Plus,
  Star,
  User
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import jsPDF from "jspdf";

const ResumeBuilder = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [experienceLevel, setExperienceLevel] = useState<number>(0);
  const [resumePoints, setResumePoints] = useState<number>(0);

  // Resume data state
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: ""
  });
  
  const [experiences, setExperiences] = useState([{
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    description: ""
  }]);
  
  const [education, setEducation] = useState([{
    degree: "",
    institution: "",
    startDate: "",
    endDate: ""
  }]);
  
  const [skills, setSkills] = useState({
    technical: "",
    soft: ""
  });

  // Cover Letter data state
  const [coverLetter, setCoverLetter] = useState({
    companyName: "",
    position: "",
    hiringManager: "",
    introduction: "",
    body: "",
    closing: ""
  });

  // Gamification feedback function
  const awardPoints = (points: number, message: string) => {
    setResumePoints(prev => prev + points);
    toast({
      title: `+${points} points!`,
      description: message,
      variant: "default",
    });
  };

  // Handle personal info changes
  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
    if (field === "title") {
      awardPoints(10, "Professional title added!");
    } else {
      awardPoints(5, "Personal details added!");
    }
  };

  // Handle experience changes
  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperiences = [...experiences];
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: value
    };
    setExperiences(newExperiences);
    if (field === "jobTitle") {
      setExperienceLevel(prev => prev + 1);
      awardPoints(15, "Work experience added!");
    } else if (field === "description") {
      awardPoints(20, "Detailed job description added! Great work!");
    }
  };

  // Add new experience
  const addExperience = () => {
    setExperiences([...experiences, {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: ""
    }]);
    awardPoints(5, "Adding more experiences is great!");
  };

  // Remove experience
  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  // Handle education changes
  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    };
    setEducation(newEducation);
    if (field === "degree") {
      awardPoints(15, "Education details added!");
    }
  };

  // Add new education
  const addEducation = () => {
    setEducation([...education, {
      degree: "",
      institution: "",
      startDate: "",
      endDate: ""
    }]);
  };

  // Remove education
  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  // Handle skills changes
  const handleSkillsChange = (field: string, value: string) => {
    setSkills(prev => ({
      ...prev,
      [field]: value
    }));
    if (field === "technical") {
      awardPoints(20, "Skills improve your resume visibility!");
    } else {
      awardPoints(15, "Soft skills are important too!");
    }
  };

  // Handle cover letter changes
  const handleCoverLetterChange = (field: string, value: string) => {
    setCoverLetter(prev => ({
      ...prev,
      [field]: value
    }));
    
    const pointsMap: { [key: string]: number } = {
      companyName: 10,
      introduction: 15,
      body: 20,
      closing: 10
    };
    
    const messageMap: { [key: string]: string } = {
      companyName: "Personalizing your cover letter!",
      introduction: "Great introduction paragraph!",
      body: "Detailed cover letter content added!",
      closing: "Strong conclusion paragraph!"
    };
    
    if (pointsMap[field]) {
      awardPoints(pointsMap[field], messageMap[field] || "Cover letter updated!");
    }
  };

  // Download resume as PDF
  const downloadResume = () => {
    const doc = new jsPDF();
    
    // Set font sizes and spacing
    const titleSize = 16;
    const headingSize = 12;
    const normalSize = 10;
    const smallSize = 8;
    const margin = 20;
    let yPosition = margin;
    
    // Header with name and title
    doc.setFontSize(titleSize);
    doc.setFont("helvetica", "bold");
    doc.text(personalInfo.fullName || "Your Name", 105, yPosition, { align: "center" });
    yPosition += 7;
    
    // Contact info
    doc.setFontSize(normalSize);
    doc.setFont("helvetica", "normal");
    const contactInfo = [
      personalInfo.title || "Professional Title",
      [
        personalInfo.email || "Email",
        personalInfo.phone || "Phone",
        personalInfo.location || "Location"
      ].join(" | ")
    ];
    
    contactInfo.forEach(line => {
      doc.text(line, 105, yPosition, { align: "center" });
      yPosition += 5;
    });
    
    yPosition += 5;
    
    // Experience section
    if (experiences.some(exp => exp.jobTitle || exp.company)) {
      doc.setFontSize(headingSize);
      doc.setFont("helvetica", "bold");
      doc.text("PROFESSIONAL EXPERIENCE", margin, yPosition);
      yPosition += 2;
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, 190, yPosition);
      yPosition += 5;
      
      experiences.forEach(exp => {
        if (exp.jobTitle || exp.company) {
          // Job title and dates on the same line
          doc.setFontSize(normalSize);
          doc.setFont("helvetica", "bold");
          doc.text(exp.jobTitle || "Position", margin, yPosition);
          
          const dateText = `${exp.startDate || "Start"} - ${exp.endDate || "Present"}`;
          doc.setFont("helvetica", "normal");
          doc.text(dateText, 190, yPosition, { align: "right" });
          yPosition += 5;
          
          // Company
          doc.setFont("helvetica", "italic");
          doc.text(exp.company || "Company", margin, yPosition);
          yPosition += 5;
          
          // Description
          if (exp.description) {
            doc.setFontSize(smallSize);
            doc.setFont("helvetica", "normal");
            
            // Split description into lines that fit within page width
            const splitDescription = doc.splitTextToSize(exp.description, 170);
            doc.text(splitDescription, margin, yPosition);
            yPosition += splitDescription.length * 4 + 3;
          } else {
            yPosition += 3;
          }
        }
      });
      
      yPosition += 2;
    }
    
    // Education section
    if (education.some(edu => edu.degree || edu.institution)) {
      doc.setFontSize(headingSize);
      doc.setFont("helvetica", "bold");
      doc.text("EDUCATION", margin, yPosition);
      yPosition += 2;
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, 190, yPosition);
      yPosition += 5;
      
      education.forEach(edu => {
        if (edu.degree || edu.institution) {
          // Degree and dates on the same line
          doc.setFontSize(normalSize);
          doc.setFont("helvetica", "bold");
          doc.text(edu.degree || "Degree", margin, yPosition);
          
          const dateText = `${edu.startDate || "Start"} - ${edu.endDate || "End"}`;
          doc.setFont("helvetica", "normal");
          doc.text(dateText, 190, yPosition, { align: "right" });
          yPosition += 5;
          
          // Institution
          doc.setFont("helvetica", "italic");
          doc.text(edu.institution || "Institution", margin, yPosition);
          yPosition += 8;
        }
      });
      
      yPosition += 2;
    }
    
    // Skills section
    if (skills.technical || skills.soft) {
      doc.setFontSize(headingSize);
      doc.setFont("helvetica", "bold");
      doc.text("SKILLS", margin, yPosition);
      yPosition += 2;
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, 190, yPosition);
      yPosition += 5;
      
      doc.setFontSize(smallSize);
      doc.setFont("helvetica", "normal");
      
      if (skills.technical) {
        doc.setFont("helvetica", "bold");
        doc.text("Technical Skills:", margin, yPosition);
        doc.setFont("helvetica", "normal");
        const splitTechnical = doc.splitTextToSize(skills.technical, 170);
        doc.text(splitTechnical, margin + 25, yPosition);
        yPosition += splitTechnical.length * 4 + 2;
      }
      
      if (skills.soft) {
        doc.setFont("helvetica", "bold");
        doc.text("Soft Skills:", margin, yPosition);
        doc.setFont("helvetica", "normal");
        const splitSoft = doc.splitTextToSize(skills.soft, 170);
        doc.text(splitSoft, margin + 25, yPosition);
        yPosition += splitSoft.length * 4 + 2;
      }
    }
    
    // Add ATS optimization note at the bottom
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text("* This resume follows ATS-friendly formatting guidelines for optimal compatibility with applicant tracking systems.", margin, 280);
    
    doc.save(`${personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}.pdf`);
    awardPoints(50, "Resume downloaded successfully! 🎉");
  };

  // Download cover letter
  const downloadCoverLetter = () => {
    const doc = new jsPDF();
    
    // Set font sizes and spacing
    const normalSize = 11;
    const smallSize = 10;
    const margin = 20;
    let yPosition = margin;
    
    // Contact info block (right-aligned)
    doc.setFontSize(normalSize);
    doc.setFont("helvetica", "normal");
    
    // Header with sender's info (right-aligned)
    [
      personalInfo.fullName || "Your Name",
      personalInfo.email || "email@example.com",
      personalInfo.phone || "Phone Number",
      personalInfo.location || "Location",
      new Date().toLocaleDateString()
    ].forEach(line => {
      doc.text(line, 190, yPosition, { align: "right" });
      yPosition += 7;
    });
    
    yPosition += 7;
    
    // Recipient info (left-aligned)
    [
      coverLetter.hiringManager || "Hiring Manager",
      coverLetter.companyName || "Company Name",
    ].forEach(line => {
      doc.text(line, margin, yPosition);
      yPosition += 7;
    });
    
    yPosition += 7;
    
    // Greeting
    doc.text(`Dear ${coverLetter.hiringManager ? coverLetter.hiringManager.split(" ")[0] : "Hiring Manager"},`, margin, yPosition);
    yPosition += 12;
    
    // Content paragraphs
    const paragraphs = [
      coverLetter.introduction || "Your introduction paragraph will appear here...",
      coverLetter.body || "The main content of your cover letter will appear here...",
      coverLetter.closing || "Your closing paragraph will appear here..."
    ];
    
    paragraphs.forEach(paragraph => {
      const splitParagraph = doc.splitTextToSize(paragraph, 170);
      doc.text(splitParagraph, margin, yPosition);
      yPosition += splitParagraph.length * 7 + 5;
    });
    
    yPosition += 14;
    
    // Closing
    doc.text("Sincerely,", margin, yPosition);
    yPosition += 14;
    doc.text(personalInfo.fullName || "Your Name", margin, yPosition);
    
    // Add ATS optimization note at the bottom
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text("* This cover letter follows ATS-friendly formatting guidelines for optimal compatibility with applicant tracking systems.", margin, 280);
    
    doc.save(`${personalInfo.fullName.replace(/\s+/g, '_') || 'CoverLetter'}.pdf`);
    awardPoints(50, "Cover letter downloaded successfully! 🎉");
  };

  // Create preview content for rendering
  const [resumePreviewContent, setResumePreviewContent] = useState<string>("");
  const [coverLetterPreviewContent, setCoverLetterPreviewContent] = useState<string>("");

  // Update preview whenever data changes
  useEffect(() => {
    // Update Resume Preview
    if (personalInfo.fullName || experiences.length > 0 || education.length > 0) {
      setResumePreviewContent(`
        <div style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 20px; font-weight: bold; color: #1a73e8;">${personalInfo.fullName || "Your Name"}</h1>
            <p style="margin: 5px 0;">
              ${personalInfo.title ? personalInfo.title : "Professional Title"}
            </p>
            <p style="margin: 5px 0;">
              ${personalInfo.email ? personalInfo.email : "email@example.com"} | 
              ${personalInfo.phone ? personalInfo.phone : "Phone"} | 
              ${personalInfo.location ? personalInfo.location : "Location"}
            </p>
          </div>
          
          ${experiences.some(exp => exp.jobTitle || exp.company) ? `
            <div style="margin-bottom: 15px;">
              <h2 style="font-size: 14px; color: #1a73e8; border-bottom: 1px solid #1a73e8; padding-bottom: 3px; margin-bottom: 8px;">PROFESSIONAL EXPERIENCE</h2>
              ${experiences.map(exp => `
                <div style="margin-bottom: 10px;">
                  <div style="display: flex; justify-content: space-between;">
                    <strong>${exp.jobTitle || "Position"}</strong>
                    <span>${exp.startDate || "Start"} - ${exp.endDate || "Present"}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <em>${exp.company || "Company"}</em>
                  </div>
                  <p style="margin: 5px 0 10px; font-size: 11px;">${exp.description || "Job description and achievements"}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${education.some(edu => edu.degree || edu.institution) ? `
            <div style="margin-bottom: 15px;">
              <h2 style="font-size: 14px; color: #1a73e8; border-bottom: 1px solid #1a73e8; padding-bottom: 3px; margin-bottom: 8px;">EDUCATION</h2>
              ${education.map(edu => `
                <div style="margin-bottom: 10px;">
                  <div style="display: flex; justify-content: space-between;">
                    <strong>${edu.degree || "Degree"}</strong>
                    <span>${edu.startDate || "Start"} - ${edu.endDate || "End"}</span>
                  </div>
                  <em>${edu.institution || "Institution"}</em>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${skills.technical || skills.soft ? `
            <div>
              <h2 style="font-size: 14px; color: #1a73e8; border-bottom: 1px solid #1a73e8; padding-bottom: 3px; margin-bottom: 8px;">SKILLS</h2>
              ${skills.technical ? `<p><strong>Technical:</strong> ${skills.technical}</p>` : ''}
              ${skills.soft ? `<p><strong>Soft Skills:</strong> ${skills.soft}</p>` : ''}
            </div>
          ` : ''}
          <div style="text-align: center; margin-top: 20px; font-size: 10px; color: #666;">
            <p>ATS-Optimized Resume Template</p>
          </div>
        </div>
      `);
    } else {
      setResumePreviewContent("");
    }

    // Update Cover Letter Preview
    if (coverLetter.companyName || coverLetter.introduction || coverLetter.body) {
      setCoverLetterPreviewContent(`
        <div style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; padding: 20px;">
          <div style="text-align: right; margin-bottom: 20px;">
            <p>${personalInfo.fullName || "Your Name"}</p>
            <p>${personalInfo.email || "email@example.com"}</p>
            <p>${personalInfo.phone || "Phone Number"}</p>
            <p>${personalInfo.location || "Location"}</p>
            <p>${new Date().toLocaleDateString()}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p>${coverLetter.hiringManager ? coverLetter.hiringManager : "Hiring Manager"}</p>
            <p>${coverLetter.companyName || "Company Name"}</p>
          </div>
          
          <p>Dear ${coverLetter.hiringManager ? coverLetter.hiringManager.split(" ")[0] : "Hiring Manager"},</p>
          
          <p>${coverLetter.introduction || "Your introduction paragraph will appear here..."}</p>
          
          <p>${coverLetter.body || "The main content of your cover letter will appear here..."}</p>
          
          <p>${coverLetter.closing || "Your closing paragraph will appear here..."}</p>
          
          <p style="margin-top: 20px;">Sincerely,</p>
          <p>${personalInfo.fullName || "Your Name"}</p>
          
          <div style="text-align: center; margin-top: 20px; font-size: 10px; color: #666;">
            <p>ATS-Optimized Cover Letter Template</p>
          </div>
        </div>
      `);
    } else {
      setCoverLetterPreviewContent("");
    }
  }, [personalInfo, experiences, education, skills, coverLetter]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Resume Builder | PrepWise</title>
        <meta name="description" content="Build professional resumes and cover letters that stand out to employers" />
      </Helmet>

      <Header />
      
      <main className="container mx-auto py-10 px-4 animate-fade-in">
        <section className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 animate-slide-in-up">
              Resume & Cover Letter Builder
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slide-in-up animation-delay-200">
              Create professional documents that highlight your strengths and make you stand out to employers.
            </p>
          </div>

          {/* Gamification progress */}
          <div className="mb-8 max-w-md mx-auto bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Star className="text-yellow-400 h-5 w-5 mr-2" />
                <span className="font-medium">Resume Master</span>
              </div>
              <span className="text-blue-600 font-semibold">{resumePoints} pts</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min((resumePoints / 1000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <Tabs defaultValue="resume" className="w-full">
            <TabsList className="mb-8 flex justify-center w-full max-w-2xl mx-auto bg-gray-100 p-1 rounded-full">
              <TabsTrigger value="resume" className="flex-1 rounded-full py-3 flex items-center justify-center">
                <FileText className="mr-2 h-4 w-4" />
                Resume
              </TabsTrigger>
              <TabsTrigger value="cover-letter" className="flex-1 rounded-full py-3 flex items-center justify-center">
                <FileEdit className="mr-2 h-4 w-4" />
                Cover Letter
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="resume" className="mt-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Personal Details */}
                  <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <User className="mr-2 h-5 w-5 text-blue-500" />
                        Personal Details
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <Input 
                            placeholder="Jane Doe" 
                            className="w-full" 
                            value={personalInfo.fullName}
                            onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <Input 
                            placeholder="jane.doe@example.com" 
                            className="w-full" 
                            value={personalInfo.email}
                            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <Input 
                            placeholder="(123) 456-7890" 
                            className="w-full"
                            value={personalInfo.phone}
                            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <Input 
                            placeholder="New York, NY" 
                            className="w-full"
                            value={personalInfo.location}
                            onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                          <Input 
                            placeholder="Software Engineer" 
                            className="w-full"
                            value={personalInfo.title}
                            onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Experience */}
                  <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Briefcase className="mr-2 h-5 w-5 text-blue-500" />
                        Work Experience
                      </h2>
                      
                      <div className="space-y-4">
                        {experiences.map((experience, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                <Input 
                                  placeholder="Senior Developer" 
                                  className="w-full"
                                  value={experience.jobTitle}
                                  onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                <Input 
                                  placeholder="Tech Solutions Inc." 
                                  className="w-full"
                                  value={experience.company}
                                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <Input 
                                  placeholder="Jan 2020" 
                                  className="w-full"
                                  value={experience.startDate}
                                  onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <Input 
                                  placeholder="Present" 
                                  className="w-full"
                                  value={experience.endDate}
                                  onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                              <Textarea 
                                placeholder="Describe your responsibilities and achievements..." 
                                className="w-full min-h-[100px]"
                                value={experience.description}
                                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                              />
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                                onClick={() => removeExperience(index)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="w-full border-dashed" onClick={addExperience}>
                          <Plus className="h-4 w-4 mr-2" /> Add Another Experience
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Education */}
                  <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5 text-blue-500" />
                        Education
                      </h2>
                      
                      <div className="space-y-4">
                        {education.map((edu, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                <Input 
                                  placeholder="Bachelor of Science in Computer Science" 
                                  className="w-full"
                                  value={edu.degree}
                                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                                <Input 
                                  placeholder="University of Technology" 
                                  className="w-full"
                                  value={edu.institution}
                                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <Input 
                                  placeholder="Sep 2016" 
                                  className="w-full"
                                  value={edu.startDate}
                                  onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <Input 
                                  placeholder="Jun 2020" 
                                  className="w-full"
                                  value={edu.endDate}
                                  onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                                onClick={() => removeEducation(index)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="w-full border-dashed" onClick={addEducation}>
                          <Plus className="h-4 w-4 mr-2" /> Add Another Education
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Skills */}
                  <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Award className="mr-2 h-5 w-5 text-blue-500" />
                        Skills
                      </h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Technical Skills</label>
                          <Textarea 
                            placeholder="e.g., JavaScript, React, Node.js" 
                            className="w-full min-h-[80px]"
                            value={skills.technical}
                            onChange={(e) => handleSkillsChange('technical', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Soft Skills</label>
                          <Textarea 
                            placeholder="e.g., Leadership, Communication, Problem Solving" 
                            className="w-full min-h-[80px]"
                            value={skills.soft}
                            onChange={(e) => handleSkillsChange('soft', e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <div className="sticky top-24 space-y-6">
                    <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 aspect-[1/1.414] overflow-hidden shadow-inner">
                          {resumePreviewContent ? (
                            <div 
                              className="w-full h-full overflow-auto"
                              dangerouslySetInnerHTML={{ __html: resumePreviewContent }}
                            />
                          ) : (
                            <div className="text-center flex flex-col items-center justify-center h-full">
                              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                              <p className="text-gray-500 text-sm">Fill in your details to see the preview</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-6">
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700 py-6"
                            onClick={downloadResume}
                            disabled={!personalInfo.fullName}
                            size="lg"
                          >
                            <Download className="mr-2 h-5 w-5" /> Download Resume
                          </Button>
                        </div>
                        
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <h3 className="font-medium text-blue-800 mb-2">Resume Strength</h3>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${Math.min(experienceLevel * 15, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-blue-700 mt-2">
                            {experienceLevel < 2 ? 
                              "Add more experiences to improve your resume" : 
                              "Your resume is looking good!"}
                          </p>
                        </div>
                        
                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                          <h3 className="font-medium text-green-800 mb-2">ATS Optimization Tips</h3>
                          <ul className="text-sm text-green-700 space-y-2 list-disc pl-4">
                            <li>Use keywords from the job description</li>
                            <li>Quantify achievements with numbers</li>
                            <li>Use standard section headings</li>
                            <li>Avoid tables, images, and fancy formatting</li>
                            <li>Use clean, standard fonts</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cover-letter" className="mt-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Cover Letter Details</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                          <Input 
                            placeholder="Target Company" 
                            className="w-full" 
                            value={coverLetter.companyName}
                            onChange={(e) => handleCoverLetterChange('companyName', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Position Applied For</label>
                          <Input 
                            placeholder="Senior Developer" 
                            className="w-full"
                            value={coverLetter.position}
                            onChange={(e) => handleCoverLetterChange('position', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager (if known)</label>
                          <Input 
                            placeholder="John Smith" 
                            className="w-full"
                            value={coverLetter.hiringManager}
                            onChange={(e) => handleCoverLetterChange('hiringManager', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
                          <Textarea 
                            placeholder="Write an engaging introduction explaining why you're interested in this role..." 
                            className="w-full min-h-[100px]"
                            value={coverLetter.introduction}
                            onChange={(e) => handleCoverLetterChange('introduction', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                          <Textarea 
                            placeholder="Highlight your relevant skills and experiences..." 
                            className="w-full min-h-[200px]"
                            value={coverLetter.body}
                            onChange={(e) => handleCoverLetterChange('body', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Closing</label>
                          <Textarea 
                            placeholder="Write a strong closing paragraph..." 
                            className="w-full min-h-[100px]"
                            value={coverLetter.closing}
                            onChange={(e) => handleCoverLetterChange('closing', e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <div className="sticky top-24 space-y-6">
                    <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Cover Letter Preview</h2>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 aspect-[1/1.414] overflow-hidden shadow-inner">
                          {coverLetterPreviewContent ? (
                            <div 
                              className="w-full h-full overflow-auto"
                              dangerouslySetInnerHTML={{ __html: coverLetterPreviewContent }}
                            />
                          ) : (
                            <div className="text-center flex flex-col items-center justify-center h-full">
                              <FileEdit className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                              <p className="text-gray-500 text-sm">Fill in your details to see the preview</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-6">
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700 py-6"
                            onClick={downloadCoverLetter}
                            disabled={!personalInfo.fullName || !coverLetter.introduction}
                            size="lg"
                          >
                            <Download className="mr-2 h-5 w-5" /> Download Cover Letter
                          </Button>
                        </div>
                        
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <h3 className="font-medium text-blue-800 mb-2">Cover Letter Tips</h3>
                          <ul className="text-sm text-blue-700 space-y-2 list-disc pl-4">
                            <li>Research the company before writing</li>
                            <li>Address the hiring manager by name if possible</li>
                            <li>Connect your experience to the job requirements</li>
                            <li>Keep it concise (one page maximum)</li>
                            <li>Proofread for grammar and spelling errors</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumeBuilder;
