import SignupForm from "@/demo/auth-demo/SignupForm";
import { CheckSquare } from "lucide-react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CheckSquare className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">TodoCollab</h1>
          </div>
          <p className="text-gray-600">
            Collaborative realtime todo management
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUp;
