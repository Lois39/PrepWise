
import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/context/LanguageContext";
import CommunityForum from "@/components/CommunityForum";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Community = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Community Forum | PrepWise</title>
        <meta name="description" content="Join our community forum to share experiences, tips and get feedback from other interview candidates" />
      </Helmet>

      <Header />
      <main className="container mx-auto py-10 px-4 animate-fade-in">
        <section className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-blue animate-slide-in-up">
              PrepWise Community Forum
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slide-in-up animation-delay-200">
              Share your interview experiences, ask questions, and learn from others in our supportive community of job seekers and career experts.
            </p>
          </div>

          <div className="grid gap-6">
            <CommunityForum />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
