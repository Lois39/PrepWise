
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from "@/components/ui/card";

const Tips = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="interview-container">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Tips</h1>
            <p className="text-xl text-gray-600">Expert advice to help you ace your next interview</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Before the Interview</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span>Research the company thoroughly</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span>Practice common interview questions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span>Prepare your own questions to ask</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span>Get a good night's sleep</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">During the Interview</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    </div>
                    <span>Maintain good eye contact</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    </div>
                    <span>Use the STAR method for behavioral questions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    </div>
                    <span>Be specific with examples</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    </div>
                    <span>Show enthusiasm and positive energy</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">After the Interview</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                    </div>
                    <span>Send a thank-you email within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                    </div>
                    <span>Follow up if you don't hear back in a week</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                    </div>
                    <span>Reflect on your performance</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-2 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                    </div>
                    <span>Continue practicing for future interviews</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
            <h2 className="text-2xl font-bold mb-4">Pro Tip: The STAR Method</h2>
            <p className="text-gray-700 mb-4">
              When answering behavioral questions, use the STAR method to structure your response:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-bold text-interview-primary mb-2">Situation</h3>
                <p className="text-sm">Describe the context or background of the specific situation.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-bold text-interview-primary mb-2">Task</h3>
                <p className="text-sm">Explain your responsibility or what you were trying to accomplish.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-bold text-interview-primary mb-2">Action</h3>
                <p className="text-sm">Detail the specific steps you took to address the situation.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-bold text-interview-primary mb-2">Result</h3>
                <p className="text-sm">Share the outcomes of your actions and what you learned.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tips;
