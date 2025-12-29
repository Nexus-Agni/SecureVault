import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { account } from "@/lib/appwrite";
import { AuthenticationFactor } from "appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaShieldAlt, FaKey } from "react-icons/fa";
import { AuthHeader } from "@/components/AuthHeader";
import { Loader } from "@/components/Loader";

function SecondFactorAuth() {
    const [challengeId, setChallengeId] = useState(null);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [useRecoveryCode, setUseRecoveryCode] = useState(false);
    const navigate = useNavigate();
    
    const createChallengeHandler = async () => {
        try {
            setLoading(true);
            const challenge = await account.createMfaChallenge(
                AuthenticationFactor.Totp
            );
    
            const challengeId = challenge.$id;
            setChallengeId(challengeId);
            toast.success("Enter the code from your authenticator app");
        } catch (error) {
            toast.error(error.message || "Failed to create challenge");
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }

    // use of recovery codes in case totp (authenticator app) is not available or compromised
    const createRecoveryCodesChallengeHandler = async () => {
        try {
            setLoading(true);
            const challenge = await account.createMfaChallenge(
                AuthenticationFactor.Recoverycode
            );

            const challengeId = challenge.$id;
            setChallengeId(challengeId);
            setUseRecoveryCode(true);
            toast.success("Enter one of your recovery codes");
        } catch (error) {
            toast.error(error.message || "Failed to create recovery challenge");
        } finally {
            setLoading(false);
        }
    }

    // use this handler both in case of totp (authenticator app) and recovery codes. 
    const completeChallengeHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await account.updateMfaChallenge(
                challengeId,
                otp
            );
            toast.success('Logged In Successfully');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message || "Invalid code. Please try again.");
            setOtp("");
        } finally {
            setLoading(false);
        }
    }

    // Auto-create challenge on mount
    useState(() => {
        createChallengeHandler();
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-[#22040b] via-[#120006] to-black text-neutral-100">
            <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8">
                <AuthHeader />

                <div className="mt-10 flex flex-1 items-center justify-center">
                    <Card className="w-full max-w-md border-red-500/20 bg-linear-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 shadow-[0_0_60px_rgba(239,68,68,0.25),0_0_100px_rgba(239,68,68,0.1)] backdrop-blur-xl">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500/40 bg-linear-to-br from-red-500/20 to-red-600/10 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                                <FaShieldAlt className="h-7 w-7" />
                            </div>
                            <CardTitle className="text-3xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                Two-Factor Authentication
                            </CardTitle>
                            <CardDescription className="text-neutral-300">
                                {useRecoveryCode 
                                    ? "Enter a recovery code to continue" 
                                    : "Enter the 6-digit code from your authenticator app"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={completeChallengeHandler} className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="otp" className="text-neutral-200">
                                        {useRecoveryCode ? "Recovery Code" : "Authentication Code"}
                                    </Label>
                                    <Input
                                        id="otp"
                                        type="text"
                                        placeholder={useRecoveryCode ? "Enter recovery code" : "000000"}
                                        autoComplete="one-time-code"
                                        value={otp}
                                        onChange={(e) => {
                                            const value = useRecoveryCode 
                                                ? e.target.value 
                                                : e.target.value.replace(/\D/g, '').slice(0, 6);
                                            setOtp(value);
                                        }}
                                        required
                                        maxLength={useRecoveryCode ? 50 : 6}
                                        className="border-neutral-700 bg-neutral-900/50 text-white placeholder:text-neutral-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] text-center text-2xl font-mono tracking-wider"
                                    />
                                    {!useRecoveryCode && otp.length > 0 && otp.length < 6 && (
                                        <p className="text-xs text-red-400">Code must be 6 digits</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading || (!useRecoveryCode && otp.length !== 6) || (useRecoveryCode && !otp)}
                                    className="w-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all duration-300"
                                    size="lg"
                                >
                                    {loading ? <Loader /> : 'Verify'}
                                </Button>
                            </form>

                            <div className="mt-6 space-y-3">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-neutral-700" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-black px-2 text-neutral-500">Or</span>
                                    </div>
                                </div>

                                {!useRecoveryCode ? (
                                    <Button
                                        type="button"
                                        onClick={createRecoveryCodesChallengeHandler}
                                        variant="link"
                                        className="w-full text-red-400 hover:text-red-300"
                                        disabled={loading}
                                    >
                                        <FaKey className="mr-2" />
                                        Use Recovery Code Instead
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setUseRecoveryCode(false);
                                            createChallengeHandler();
                                            setOtp("");
                                        }}
                                        variant="link"
                                        className="w-full text-red-400 hover:text-red-300"
                                        disabled={loading}
                                    >
                                        <FaShieldAlt className="mr-2" />
                                        Use Authenticator App Instead
                                    </Button>
                                )}

                                <Button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    variant="link"
                                    className="w-full text-neutral-400 hover:text-neutral-300"
                                >
                                    Back to Login
                                </Button>
                            </div>

                            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <p className="text-blue-400 text-xs text-center">
                                    🔒 Your account is protected with two-factor authentication
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default SecondFactorAuth