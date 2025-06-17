
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error during auth callback:", error);
        setError(error.message);
        return;
      }
      
      if (data.session) {
        navigate("/profile");
      } else {
        navigate("/sign-in");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mt-2 text-gray-600">{error}</p>
        <button
          onClick={() => navigate("/sign-in")}
          className="mt-4 px-4 py-2 bg-interview-primary text-white rounded"
        >
          Return to sign in
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Authenticating...</h1>
      <p className="mt-2 text-gray-600">Please wait while we verify your account.</p>
    </div>
  );
}
