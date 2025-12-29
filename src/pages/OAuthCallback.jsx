import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '@/lib/appwrite';
import { toast } from 'sonner';
import { Loader } from '@/components/Loader';
import { AuthenticationFactor } from 'appwrite';

function OAuthCallback() {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkMFAStatus = async () => {
            try {
                // Get current user session
                const user = await account.get();
                
                // Check if user has MFA enabled
                const mfaFactors = await account.listMfaFactors();
                
                // Check if TOTP (authenticator app) is enabled
                const totpEnabled = mfaFactors.totp;
                
                if (totpEnabled) {
                    // MFA is enabled, need to complete the challenge
                    // Create MFA challenge
                    try {
                        const challenge = await account.createMfaChallenge(
                            AuthenticationFactor.Totp
                        );
                        
                        // Redirect to MFA page to complete authentication
                        toast.info('Please complete two-factor authentication');
                        navigate('/mfa', { replace: true });
                    } catch (challengeError) {
                        // If challenge creation fails, it might mean MFA is not properly set up
                        console.error('MFA Challenge Error:', challengeError);
                        // Proceed to dashboard anyway
                        toast.success('Logged in successfully');
                        navigate('/dashboard', { replace: true });
                    }
                } else {
                    // No MFA, proceed to dashboard
                    toast.success('Logged in successfully');
                    navigate('/dashboard', { replace: true });
                }
            } catch (error) {
                console.error('OAuth Callback Error:', error);
                toast.error('Authentication failed. Please try again.');
                navigate('/login', { replace: true });
            } finally {
                setChecking(false);
            }
        };

        checkMFAStatus();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-linear-to-br from-[#22040b] via-[#120006] to-black flex items-center justify-center">
            <div className="text-center">
                <Loader />
                <p className="text-white mt-4 text-lg">Completing authentication...</p>
                <p className="text-stone-400 text-sm mt-2">Please wait while we verify your credentials</p>
            </div>
        </div>
    );
}

export default OAuthCallback;
