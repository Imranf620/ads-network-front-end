import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { loginUser, regsiter } from "../../features/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [accountId, setAccountId] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await dispatch(loginUser({ email, password }));
    setLoading(false);
    if (res.payload.success === true) {
      toast.success("Login Successful");
      if(res.payload.user.role==="admin"){

        navigate("/admin/dashboard");
      }else{
        navigate("/monitizers");
      }
    } else {
      toast.error(res.payload);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password and confirm password must be the same");
      return;
    }
    if (!accountType || !accountId) {
      setError("Please select a social media platform and enter a user ID");
      return;
    }
    setLoading(true);

    const res = await dispatch(
      regsiter({ email, password, accountId , name, accountType, role})
    );
    setLoading(false);
    if (res.payload.success === true) {
      toast.success("Registration Successful");
      navigate("/dashboard");
    } else {
      toast.error(res.payload);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form
          onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Account Type
                </label>
                <select
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Account Type</option>
                  <option value="monetizer">Monetizer</option>
                  {/* <option value="advertiser">Advertiser</option> */}
               
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Social Media Platform
                </label>
                <select
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value="">Select Platform</option>
                  <option value="instagram">Instagram</option>
                  <option value="telegram">Telegram</option>
                  <option value="discord">Discord</option>
                </select>
              </div>
              {accountType && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Enter {accountType} ID
                  </label>
                  <input
                    type="text"
                    placeholder={`${accountType} ID`}
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <button
          className="text-blue-500 hover:text-blue-700 mt-4 block mx-auto"
          onClick={toggleAuthMode}
        >
          {isLogin
            ? "Don’t have an account? Sign Up"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
