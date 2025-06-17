
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

export type Language = {
  code: string;
  name: string;
  flag: string;
};

interface LanguageSelectorProps {
  onChange?: (language: string) => void;
}

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ar", name: "العربية", flag: "🇦🇪" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

// Comprehensive translations for site-wide usage
export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    welcome: "Welcome to Prepwise",
    schedule: "Schedule Practice Sessions",
    community: "Community Forum",
    practice: "Practice",
    practice_interview: "Practice Interview",
    questions: "Browse Questions",
    results: "View Results",
    profile: "My Profile",
    sign_in: "Sign In",
    sign_out: "Sign Out",
    get_started: "Get Started",
    home: "Home",
    tools: "Tools",
    resources: "Resources",
    pricing: "Pricing",
    about: "About Us",
    about_us: "About Us",
    blog: "Blog",
    guides: "Guides",
    tips: "Interview Tips",
    resume_builder: "Resume Builder",
    language: "Language",
    schedule_practice: "Schedule Practice",
    schedule_meta_description: "Schedule your interview practice sessions and receive reminders to maintain consistent preparation routines",
    schedule_sessions: "Schedule Your Practice Sessions",
    schedule_description: "Plan your interview preparation schedule, set reminders, and develop consistent practice habits to improve your interview skills.",
    schedule_card_desc: "Plan your practice sessions",
    practice_card_desc: "Regular sessions improve skills",
    track: "Track",
    track_card_desc: "Monitor your progress",
    remind: "Remind",
    remind_card_desc: "Never miss a practice",
    calendar_view: "Calendar View",
    list_view: "List View",
    behavioral_interview: "Behavioral Interview Practice",
    technical_interview: "Technical Interview",
    mock_interview: "Mock Interview with AI",
    tomorrow_time: "Tomorrow, {{time}}",
    date_time: "{{date}}, {{time}}",
    behavioral: "Behavioral",
    technical: "Technical",
    mock: "Mock",
    page_not_found: "Page Not Found",
    page_not_found_desc: "The page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to the homepage.",
    return_home: "Return Home",
    go_back: "Go Back",
    features: "Features",
    company: "Company",
    performance_analytics: "Performance Analytics",
    ai_feedback: "AI Feedback",
    interview_guides: "Interview Guides",
    career_tips: "Career Tips",
    faqs: "FAQs",
    careers: "Careers",
    contact: "Contact",
    privacy_policy: "Privacy Policy",
    footer_description: "Revolutionizing interview preparation with AI-powered feedback and coaching.",
    all_rights_reserved: "All rights reserved.",
    last_updated: "Last updated",
    privacy_intro: "At PrepWise, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our interview preparation platform.",
    information_collect: "Information We Collect",
    information_collect_desc: "We collect information that you provide directly to us, such as when you create an account, use our interview simulation features, or contact our support team. This may include:",
    personal_info: "Personal information (name, email address, profession)",
    account_credentials: "Account credentials",
    payment_info: "Payment information (processed securely through our payment processor)",
    interview_recordings: "Interview recordings and transcripts",
    feedback: "Feedback and survey responses",
    communications: "Communications with our team",
    auto_collect: "We also automatically collect certain information when you use our platform, including:",
    device_info: "Device information (browser type, operating system)",
    usage_patterns: "Usage patterns and interactions",
    ip_address: "IP address and location information",
    referral_sources: "Referral sources",
    how_use_info: "How We Use Your Information",
    use_info_desc: "We use the information we collect for various purposes, including:",
    providing_services: "Providing and improving our services",
    processing_transactions: "Processing transactions",
    personalizing_experience: "Personalizing your experience",
    analyzing_patterns: "Analyzing usage patterns to enhance our platform",
    training_ai: "Training our AI systems to provide better feedback",
    communicating_updates: "Communicating with you about updates and features",
    responding_inquiries: "Responding to your inquiries and support requests",
    protecting_fraud: "Protecting against fraudulent or unauthorized activity",
    info_sharing: "Information Sharing",
    sharing_circumstances: "We may share your information in the following circumstances:",
    service_providers: "With service providers who perform services on our behalf",
    legal_obligations: "To comply with legal obligations",
    business_transaction: "In connection with a business transaction (merger, acquisition, etc.)",
    with_consent: "With your consent or at your direction",
    no_sell_info: "We do not sell your personal information to third parties.",
    data_security: "Data Security",
    security_measures: "We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.",
    your_rights: "Your Rights and Choices",
    rights_desc: "Depending on your location, you may have certain rights regarding your personal information, including:",
    accessing_info: "Accessing your personal information",
    correcting_info: "Correcting inaccurate information",
    deleting_info: "Deleting your information",
    restricting_processing: "Restricting or objecting to processing",
    data_portability: "Data portability",
    withdrawing_consent: "Withdrawing consent",
    exercise_rights: "To exercise these rights, please contact us at privacy@prepwise.com.",
    policy_changes: "Changes to This Policy",
    update_policy: "We may update this Privacy Policy from time to time. The updated version will be indicated by an updated \"Last Updated\" date and the updated version will be effective as soon as it is accessible. We encourage you to review this Privacy Policy frequently to stay informed about how we are protecting your information.",
    contact_us: "Contact Us",
    questions_concerns: "If you have questions or concerns about this Privacy Policy, please contact us at:",
    email: "Email",
    address: "Address",
    phone: "Phone",
    
    // Blog page translations
    career_advice: "Career advice",
    industry_insights: "Industry insights",
    interview_tips: "Interview tips",
    career_growth: "Career Growth",
    job_search: "Job Search",
    industry_trends: "Industry Trends",
    personal_development: "Personal Development",
    success_stories: "Success Stories",
    read_more: "Read more",
    lorem_ipsum: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis volutpat purus vel dignissim ullamcorper.",
    ten_questions_prepare: "10 Questions You Must Prepare For",
    stand_out_tech_interviews: "How to Stand Out in Tech Interviews",
    negotiating_salary: "Negotiating Your Salary Successfully",
    building_personal_brand: "Building Your Personal Brand",
    common_interview_mistakes: "Common Interview Mistakes to Avoid",
    rejection_to_offer: "From Rejection to Offer: A Success Story",
    
    // Career page translations
    careers_at_prepwise: "Careers at PrepWise",
    join_team: "Join our team and help shape the future of interview preparation",
    why_work_with_us: "Why Work With Us",
    careers_mission: "At PrepWise, we're on a mission to help job seekers succeed in their interviews through innovative AI-powered tools. We're looking for passionate individuals who share our vision and want to make a difference.",
    flexible_remote: "Flexible remote-first environment",
    competitive_compensation: "Competitive compensation and equity packages",
    unlimited_pto: "Unlimited PTO policy",
    health_benefits: "Health, dental, and vision benefits",
    professional_development: "Professional development budget",
    team_retreats: "Regular team retreats and events",
    open_positions: "Open Positions",
    senior_frontend_engineer: "Senior Frontend Engineer",
    machine_learning_engineer: "Machine Learning Engineer",
    product_designer: "Product Designer",
    content_marketing_specialist: "Content Marketing Specialist",
    engineering: "Engineering",
    ai_team: "AI Team",
    design: "Design",
    marketing: "Marketing",
    remote: "Remote",
    full_time: "Full-time",
    contract: "Contract",
    apply_now: "Apply Now",
    
    // Guides page translations
    guides_description: "Comprehensive resources to help you ace your interviews",
    technical_guides: "Technical Interview Guides",
    technical_guides_desc: "Prepare for coding, system design, and technical questions",
    behavioral_guides: "Behavioral Interview Guides",
    behavioral_guides_desc: "Master STAR method and common behavioral scenarios",
    industry_guides: "Industry-Specific Guides",
    industry_guides_desc: "Tailored resources for different professional roles",
    video_tips: "Video Interview Tips",
    video_tips_desc: "Best practices for remote and video interviews",
    data_structures: "Data Structures & Algorithms",
    system_design: "System Design",
    frontend_dev: "Front-end Development",
    backend_tech: "Back-end Technologies",
    devops_questions: "DevOps Interview Questions",
    situational_questions: "Situational Questions",
    teamwork_examples: "Teamwork Examples",
    leadership_scenarios: "Leadership Scenarios",
    conflict_resolution: "Conflict Resolution",
    problem_solving: "Problem Solving Stories",
    software_engineering: "Software Engineering",
    data_science: "Data Science",
    product_management: "Product Management",
    sales_business: "Sales & Business Development",
    setting_up_space: "Setting Up Your Space",
    body_language: "Body Language & Presence",
    tech_preparation: "Technical Preparation",
    virtual_whiteboarding: "Virtual Whiteboarding",
    followup: "Post-Interview Follow-up",
    
    // InterviewEnhanced translations
    comprehensive_prep: "Comprehensive interview preparation with AI feedback, scheduling, and community support.",
    practice_interview_desc: "Practice interviews with AI feedback, schedule your sessions, and connect with the community",
    selected_role: "Selected Role",
    change_role: "Change Role",
    single_interviewer: "Single Interviewer",
    panel_interview: "Panel Interview"
  },
  es: {
    welcome: "Bienvenido a Prepwise",
    schedule: "Programar sesiones de práctica",
    community: "Foro comunitario",
    practice: "Práctica",
    practice_interview: "Entrevista de práctica",
    questions: "Explorar preguntas",
    results: "Ver resultados",
    profile: "Mi perfil",
    sign_in: "Iniciar sesión",
    sign_out: "Cerrar sesión",
    get_started: "Comenzar",
    home: "Inicio",
    tools: "Herramientas",
    resources: "Recursos",
    pricing: "Precios",
    about: "Sobre nosotros",
    about_us: "Sobre nosotros",
    blog: "Blog",
    guides: "Guías",
    tips: "Consejos para entrevistas",
    resume_builder: "Constructor de currículum",
    language: "Idioma",
    schedule_practice: "Programar práctica",
    schedule_meta_description: "Programa tus sesiones de práctica de entrevistas y recibe recordatorios para mantener rutinas constantes de preparación",
    schedule_sessions: "Programa tus sesiones de práctica",
    schedule_description: "Planifica tu horario de preparación para entrevistas, configura recordatorios y desarrolla hábitos de práctica constantes para mejorar tus habilidades en entrevistas.",
    schedule_card_desc: "Planifica tus sesiones de práctica",
    practice_card_desc: "Las sesiones regulares mejoran las habilidades",
    track: "Seguimiento",
    track_card_desc: "Monitorea tu progreso",
    remind: "Recordar",
    remind_card_desc: "Nunca te pierdas una práctica",
    calendar_view: "Vista de calendario",
    list_view: "Vista de lista",
    behavioral_interview: "Práctica de entrevista conductual",
    technical_interview: "Entrevista técnica",
    mock_interview: "Entrevista simulada con IA",
    tomorrow_time: "Mañana, {{time}}",
    date_time: "{{date}}, {{time}}",
    behavioral: "Conductual",
    technical: "Técnico",
    mock: "Simulada",
    page_not_found: "Página no encontrada",
    page_not_found_desc: "La página que estás buscando no existe o ha sido movida. Por favor, verifica la URL o regresa a la página de inicio.",
    return_home: "Volver al inicio",
    go_back: "Regresar",
    features: "Características",
    company: "Empresa",
    performance_analytics: "Análisis de rendimiento",
    ai_feedback: "Retroalimentación con IA",
    interview_guides: "Guías de entrevistas",
    career_tips: "Consejos profesionales",
    faqs: "Preguntas frecuentes",
    careers: "Carreras",
    contact: "Contacto",
    privacy_policy: "Política de privacidad",
    footer_description: "Revolucionando la preparación para entrevistas con retroalimentación y entrenamiento impulsados por IA.",
    all_rights_reserved: "Todos los derechos reservados.",
    last_updated: "Última actualización",
    privacy_intro: "En PrepWise, nos tomamos muy en serio tu privacidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y protegemos tu información cuando visitas nuestro sitio web o utilizas nuestra plataforma de preparación para entrevistas.",
    
    // Blog page translations
    career_advice: "Consejos de carrera",
    industry_insights: "Perspectivas de la industria",
    interview_tips: "Consejos para entrevistas",
    career_growth: "Crecimiento profesional",
    job_search: "Búsqueda de empleo",
    industry_trends: "Tendencias de la industria",
    personal_development: "Desarrollo personal",
    success_stories: "Historias de éxito",
    read_more: "Leer más",
    lorem_ipsum: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis volutpat purus vel dignissim ullamcorper.",
    ten_questions_prepare: "10 preguntas que debes preparar",
    stand_out_tech_interviews: "Cómo destacar en entrevistas técnicas",
    negotiating_salary: "Negociando tu salario con éxito",
    building_personal_brand: "Construyendo tu marca personal",
    common_interview_mistakes: "Errores comunes en entrevistas a evitar",
    rejection_to_offer: "Del rechazo a la oferta: Una historia de éxito",
    
    // Career page translations
    careers_at_prepwise: "Carreras en PrepWise",
    join_team: "Únete a nuestro equipo y ayuda a dar forma al futuro de la preparación para entrevistas",
    why_work_with_us: "Por qué trabajar con nosotros",
    careers_mission: "En PrepWise, nuestra misión es ayudar a los buscadores de empleo a tener éxito en sus entrevistas a través de herramientas innovadoras impulsadas por IA. Buscamos personas apasionadas que compartan nuestra visión y quieran hacer una diferencia.",
    flexible_remote: "Entorno flexible y remoto",
    competitive_compensation: "Paquetes de compensación y capital competitivos",
    unlimited_pto: "Política de tiempo libre ilimitado",
    health_benefits: "Beneficios de salud, dental y visión",
    professional_development: "Presupuesto para desarrollo profesional",
    team_retreats: "Retiros y eventos regulares del equipo",
    open_positions: "Posiciones abiertas",
    senior_frontend_engineer: "Ingeniero Frontend Senior",
    machine_learning_engineer: "Ingeniero de Machine Learning",
    product_designer: "Diseñador de Producto",
    content_marketing_specialist: "Especialista en Marketing de Contenidos",
    engineering: "Ingeniería",
    ai_team: "Equipo de IA",
    design: "Diseño",
    marketing: "Marketing",
    remote: "Remoto",
    full_time: "Tiempo completo",
    contract: "Contrato",
    apply_now: "Aplicar ahora",
    
    // Guides page translations
    guides_description: "Recursos completos para ayudarte a triunfar en tus entrevistas",
    technical_guides: "Guías de entrevistas técnicas",
    technical_guides_desc: "Prepárate para codificación, diseño de sistemas y preguntas técnicas",
    behavioral_guides: "Guías de entrevistas conductuales",
    behavioral_guides_desc: "Domina el método STAR y escenarios conductuales comunes",
    industry_guides: "Guías específicas de la industria",
    industry_guides_desc: "Recursos adaptados para diferentes roles profesionales",
    video_tips: "Consejos para entrevistas en video",
    video_tips_desc: "Mejores prácticas para entrevistas remotas y en video"
  },
  fr: {
    welcome: "Bienvenue sur Prepwise",
    schedule: "Planifier des sessions de pratique",
    community: "Forum communautaire",
    practice: "Pratique",
    practice_interview: "Entretien d'entraînement",
    questions: "Parcourir les questions",
    results: "Voir les résultats",
    profile: "Mon profil",
    sign_in: "Se connecter",
    sign_out: "Se déconnecter",
    get_started: "Commencer",
    home: "Accueil",
    tools: "Outils",
    resources: "Ressources",
    pricing: "Tarification",
    about: "À propos de nous",
    about_us: "À propos de nous",
    blog: "Blog",
    guides: "Guides",
    tips: "Conseils d'entretien",
    resume_builder: "Créateur de CV",
    language: "Langue"
  }
  // For simplicity, other languages use English as fallback
};

export const translate = (key: string, language: string): string => {
  const currentTranslations = TRANSLATIONS[language] || TRANSLATIONS.en;
  return currentTranslations[key] || key;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onChange }) => {
  const { language: contextLanguage, setLanguage: setContextLanguage } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState<string>(contextLanguage || "en");
  const { toast } = useToast();

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
      if (onChange) onChange(savedLanguage);
    }
  }, [onChange]);

  useEffect(() => {
    // Sync with context language if it changes
    if (contextLanguage && contextLanguage !== currentLanguage) {
      setCurrentLanguage(contextLanguage);
    }
  }, [contextLanguage]);

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    
    // Update context if available
    if (setContextLanguage) {
      setContextLanguage(languageCode);
    }
    
    // Also call onChange if provided (for backward compatibility)
    if (onChange) {
      onChange(languageCode);
    }
    
    localStorage.setItem("preferredLanguage", languageCode);
    document.documentElement.lang = languageCode;
    
    const selectedLanguage = LANGUAGES.find(lang => lang.code === languageCode);
    
    toast({
      title: `Language Changed to ${selectedLanguage?.name}`,
      description: languageCode === "en" ? 
        "Your language preference has been updated." : 
        TRANSLATIONS[languageCode]?.welcome || "Your language preference has been updated.",
      duration: 3000,
    });
  };

  const getCurrentLanguage = (): Language => {
    return LANGUAGES.find(lang => lang.code === currentLanguage) || LANGUAGES[0];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-9 h-9 px-0 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <Globe className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={
              currentLanguage === language.code 
                ? "bg-accent text-accent-foreground" 
                : ""
            }
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LanguageSelector };
