import React, { useState } from 'react'
import { account } from '@/lib/appwrite';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaLock } from 'react-icons/fa';
import { AuthHeader } from '@/components/AuthHeader';
import { Loader } from '@/components/Loader';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      console.log("Login Error: ", response);
      toast("Login failed")
    } finally {
      setLoading(false);
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
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-neutral-700 bg-neutral-900/50 text-white placeholder:text-neutral-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <Button type="button" variant="link" size="sm" className="h-auto p-0 text-red-400 hover:text-red-300 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
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