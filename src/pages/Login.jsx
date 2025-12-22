import React, { useState } from 'react'
import { account } from '@/lib/appwrite';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthHeader } from '@/components/AuthHeader';
import { Loader } from '@/components/Loader';

function Login() {
  const navigate = useNavigate();
  const {state} = useLocation();

  const [email, setEmail] = useState(state?.email || '');
  const [password, setPassword] = useState(state?.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  

  const loginHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await account.createEmailPasswordSession({
        email,
        password
      })

      console.log("Login Response: ", response);
      toast("Logged In successfully")
      navigate('/dashboard')
    } catch (error) {
      // console.log("Login Error: ", error);
      toast.error( error.message || "Something went wrong while logging in")
    } finally {
      setLoading(false);
    }
    
  }

  const passwordResetHandler  = async () => {
    try {
      const response = account.createRecovery({
        email,
        url : `${import.meta.env.VITE_BASE_URL}/reset-password`
      })
      toast("Password reset link sent to your email")
      console.log("Response: ", response);
      
    } catch (error) {
      toast("Password reset failed")
    }
  }
  
  return (
    <div className="min-h-screen bg-linear-to-br from-[#22040b] via-[#120006] to-black text-neutral-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8">
        <AuthHeader />

        <div className="mt-10 flex flex-1 items-center justify-center">
          <Card className="w-full max-w-110 border-red-500/20 bg-linear-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 shadow-[0_0_60px_rgba(239,68,68,0.25),0_0_100px_rgba(239,68,68,0.1)] backdrop-blur-xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500/40 bg-linear-to-br from-red-500/20 to-red-600/10 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                <FaLock className="h-7 w-7" />
              </div>
              <CardTitle className="text-3xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Welcome Back</CardTitle>
              <CardDescription className="text-neutral-300">Enter your credentials to access your vault.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={loginHandler} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="text-neutral-200">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="user@example.com" 
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-neutral-700 bg-neutral-900/50 text-white placeholder:text-neutral-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="password" className="text-neutral-200">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      className="border-neutral-700 bg-neutral-900/50 text-white placeholder:text-neutral-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-red-400 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                    </button>
                  </div>
                  {password && password.length < 8 && (
                    <p className="text-xs text-red-400">Password must be at least 8 characters</p>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <Button
                    onClick={passwordResetHandler}
                    type="button" variant="link" size="sm" className="h-auto p-0 text-red-400 hover:text-red-300 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                    Forgot Password?
                  </Button>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all duration-300" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? <Loader /> : 'Login'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <div className="text-center text-sm text-neutral-300">
                <p>
                  Don&apos;t have an account?{' '}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="h-auto p-0 text-red-400 hover:text-red-300 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" 
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Button>
                </p>
              </div>
              <div className="flex items-center justify-center gap-6 text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                <span>End-to-End Encrypted</span>
                <span className="h-0.5 w-8 bg-linear-to-r from-transparent via-red-500/50 to-transparent" />
                <span>SOC2 Compliant</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login