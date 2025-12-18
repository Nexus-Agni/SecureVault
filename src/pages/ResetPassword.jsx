import { account } from '@/lib/appwrite';
import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FaLock, FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa'
import { AuthHeader } from '@/components/AuthHeader'
import { Loader } from '@/components/Loader'

function ResetPassword() {
    const [searchParams, setSearchParams] = useSearchParams();
    const userId = searchParams.get('userId') || '';
    const secret = searchParams.get('secret') || '';
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
      e.preventDefault();
      
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (newPassword.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }

      try {
        setLoading(true);
        const promise = await account.updateRecovery({
          userId,
          secret,
          password: newPassword
        })
        console.log("Update password response: ", promise);
        toast("Password updated successfully")
        navigate('/login', { replace: true})
        
      } catch (error) {
        console.log("Update password error: ", error);
        toast.error("Password update failed")
      } finally {
        setLoading(false);
      }
    }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#22040b] via-[#120006] to-black text-stone-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8">
        <AuthHeader />

        <div className="mt-10 flex flex-1 items-center justify-center">
          <Card className="w-full max-w-110 border-red-500/20 bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 shadow-[0_0_60px_rgba(239,68,68,0.25),0_0_100px_rgba(239,68,68,0.1)] backdrop-blur-xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500/40 bg-linear-to-br from-red-500/20 to-red-600/10 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                <FaLock className="h-7 w-7" />
              </div>
              <CardTitle className="text-3xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Reset Password</CardTitle>
              <CardDescription className="text-stone-400">Enter your new password below.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="newPassword" className="text-stone-200">New Password</Label>
                  <div className="relative">
                    <Input 
                      id="newPassword" 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••" 
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                      className="border-stone-700 bg-stone-900/50 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-red-400 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                    </button>
                  </div>
                  {newPassword && newPassword.length < 8 && (
                    <p className="text-xs text-red-400">Password must be at least 8 characters</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="confirmPassword" className="text-stone-200">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="border-stone-700 bg-stone-900/50 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-red-400 transition-colors"
                    >
                      {showConfirmPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-red-400">Passwords do not match</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all duration-300 rounded-full" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? <Loader /> : 'Reset Password'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <div className="text-center text-sm text-stone-300">
                <p>
                  Remember your password?{' '}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="h-auto p-0 text-red-400 hover:text-red-300 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" 
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                </p>
              </div>
              <div className="flex items-center justify-center gap-6 text-[11px] uppercase tracking-[0.3em] text-stone-500">
                <span>Secure Reset</span>
                <span className="h-0.5 w-8 bg-linear-to-r from-transparent via-red-500/50 to-transparent" />
                <span>Encrypted</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword