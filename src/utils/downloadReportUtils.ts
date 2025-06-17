
import jsPDF from 'jspdf';
import { format } from 'date-fns';

interface InterviewReport {
  title: string;
  date: string;
  score: number;
  type: string;
  strengths: string[];
  improvements: string[];
}

export const generatePDFReport = (interview: InterviewReport) => {
  const doc = new jsPDF();
  
  // Set document properties
  doc.setFontSize(12);
  
  // Title
  doc.setFontSize(18);
  doc.setTextColor(33, 33, 33);
  doc.text(`Interview Performance Report`, 20, 20);
  
  // Interview Details
  doc.setFontSize(12);
  doc.text(`Interview: ${interview.title}`, 20, 40);
  doc.text(`Date: ${interview.date}`, 20, 50);
  doc.text(`Type: ${interview.type}`, 20, 60);
  doc.text(`Overall Score: ${interview.score}%`, 20, 70);
  
  // Strengths
  doc.setFontSize(14);
  doc.setTextColor(0, 128, 0);
  doc.text('Key Strengths', 20, 90);
  doc.setFontSize(12);
  doc.setTextColor(33, 33, 33);
  interview.strengths.forEach((strength, index) => {
    doc.text(`• ${strength}`, 30, 100 + index * 10);
  });
  
  // Areas of Improvement
  doc.setFontSize(14);
  doc.setTextColor(255, 0, 0);
  doc.text('Areas for Improvement', 20, 140);
  doc.setFontSize(12);
  doc.setTextColor(33, 33, 33);
  interview.improvements.forEach((improvement, index) => {
    doc.text(`• ${improvement}`, 30, 150 + index * 10);
  });
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text('© 2025 InterviewAI - Confidential', 20, 280);
  
  return doc;
};

export const downloadMockReport = (interview: InterviewReport) => {
  const pdfDoc = generatePDFReport(interview);
  const fileName = `${interview.title.replace(/\s+/g, '_')}_Report_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
  
  pdfDoc.save(fileName);
  console.log(`Downloaded report: ${fileName}`);
};
