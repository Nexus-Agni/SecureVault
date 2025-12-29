import { account, avatars } from "@/lib/appwrite";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FaShieldAlt, FaCopy, FaCheck, FaKey } from "react-icons/fa";
import { Loader } from "@/components/Loader";

function CreateMFA({ onClose }) {
    const [step, setStep] = useState(1); // 1: Recovery codes, 2: QR/Secret, 3: Verify
    const [mfaRecoveryCodes, setMfaRecoveryCodes] = useState([]); // should be seen only once
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [secretKey, setSecretKey] = useState(null);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [codesCopied, setCodesCopied] = useState(false);
    
    const createMFArecoveryCodes = async () => {
        try {
            setLoading(true);
            const response = await account.createMfaRecoveryCodes();
            setMfaRecoveryCodes(response.recoveryCodes);
            setStep(2);
            toast.success("Recovery codes generated");
        } catch (error) {
            toast.error(error.message || "Something went wrong while creating MFA recovery codes");
        } finally {
            setLoading(false);
        }
    }

    const createAuthenticatorAppQRAndSecretKey = async () => {
        try {
            setLoading(true);
            const { secret, uri } = await account.createMfaAuthenticator({
                type: 'totp'
            });
    
            const QRResourceUrl = avatars.getQR(uri);
            // show both the qr code and the secret, user will choose which one to use to set the authenticator app
            setQrCodeUrl(QRResourceUrl.toString());
            setSecretKey(secret); 
            setStep(3);
            toast.success("Scan QR code with your authenticator app");
        } catch (error) {
            toast.error(error.message || "Something went wrong while creating MFA");
        } finally {
            setLoading(false);
        }
    }

    const updateMFAauthenticatorHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const promise = await account.updateMfaAuthenticator({
                type: 'totp',
                otp
            });
            
            if (promise) {
                await account.updateMFA(true);
            }
            toast.success("MFA enabled successfully!");
            onClose?.();
        } catch (error) {
            toast.error(error.message || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const copyRecoveryCodes = () => {
        const codesText = mfaRecoveryCodes.join('\n');
        navigator.clipboard.writeText(codesText);
        setCodesCopied(true);
        toast.success("Recovery codes copied to clipboard");
        setTimeout(() => setCodesCopied(false), 2000);
    }

    const copySecretKey = () => {
        navigator.clipboard.writeText(secretKey);
        toast.success("Secret key copied to clipboard");
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <Card className="bg-linear-to-br from-stone-900 via-black to-stone-900 border border-stone-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                            <FaShieldAlt className="text-purple-500 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-white text-2xl font-bold">Enable Two-Factor Authentication</h2>
                            <p className="text-stone-400 text-sm">Step {step} of 3</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-stone-400 hover:text-white transition-colors text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Step 1: Generate Recovery Codes */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div className="bg-stone-900/50 border border-stone-800 rounded-lg p-6">
                            <h3 className="text-white font-bold text-lg mb-3">Step 1: Generate Recovery Codes</h3>
                            <p className="text-stone-400 mb-4">
                                Recovery codes are used to access your account if you lose access to your authenticator app.
                                Save these codes in a safe place - they will only be shown once.
                            </p>
                            <div className="flex items-start gap-2 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                <span className="text-yellow-500 text-xl">⚠️</span>
                                <p className="text-yellow-400 text-sm">
                                    Make sure to save these codes before proceeding. You won't be able to see them again.
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={createMFArecoveryCodes}
                            disabled={loading}
                            className="w-full bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
                            size="lg"
                        >
                            {loading ? <Loader /> : 'Generate Recovery Codes'}
                        </Button>
                    </div>
                )}

                {/* Step 2: Display Recovery Codes */}
                {step === 2 && (
                    <div className="space-y-6">
                        <div className="bg-stone-900/50 border border-stone-800 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-bold text-lg">Your Recovery Codes</h3>
                                <Button
                                    onClick={copyRecoveryCodes}
                                    variant="outline"
                                    size="sm"
                                    className="border-stone-700 bg-stone-800 hover:bg-stone-700"
                                >
                                    {codesCopied ? (
                                        <><FaCheck className="mr-2" /> Copied</>
                                    ) : (
                                        <><FaCopy className="mr-2" /> Copy All</>
                                    )}
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 p-4 bg-black/50 rounded-lg font-mono text-sm">
                                {mfaRecoveryCodes.map((code, index) => (
                                    <div key={index} className="text-green-400 p-2 bg-stone-900/50 rounded border border-stone-800">
                                        {code}
                                    </div>
                                ))}
                            </div>
                            <p className="text-stone-400 text-sm mt-4">
                                💾 Save these codes in a password manager or print them and store them securely.
                            </p>
                        </div>
                        <Button
                            onClick={createAuthenticatorAppQRAndSecretKey}
                            disabled={loading}
                            className="w-full bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
                            size="lg"
                        >
                            {loading ? <Loader /> : 'Continue to Setup Authenticator'}
                        </Button>
                    </div>
                )}

                {/* Step 3: QR Code and Verification */}
                {step === 3 && (
                    <div className="space-y-6">
                        <div className="bg-stone-900/50 border border-stone-800 rounded-lg p-6">
                            <h3 className="text-white font-bold text-lg mb-4">Step 3: Scan QR Code</h3>
                            <p className="text-stone-400 mb-4">
                                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                            </p>
                            
                            {/* QR Code */}
                            <div className="flex justify-center mb-6">
                                <div className="bg-white p-4 rounded-lg">
                                    <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
                                </div>
                            </div>

                            {/* Secret Key Alternative */}
                            <div className="space-y-2">
                                <Label className="text-stone-300">Or enter this key manually:</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={secretKey}
                                        readOnly
                                        className="font-mono bg-black/50 border-stone-700 text-white"
                                    />
                                    <Button
                                        onClick={copySecretKey}
                                        variant="outline"
                                        size="icon"
                                        className="border-stone-700 bg-stone-800 hover:bg-stone-700"
                                    >
                                        <FaCopy />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Verify OTP */}
                        <form onSubmit={updateMFAauthenticatorHandler} className="space-y-4">
                            <div className="bg-stone-900/50 border border-stone-800 rounded-lg p-6">
                                <h4 className="text-white font-bold mb-3">Verify Setup</h4>
                                <p className="text-stone-400 mb-4 text-sm">
                                    Enter the 6-digit code from your authenticator app to complete setup.
                                </p>
                                <Label htmlFor="otp" className="text-stone-300">6-Digit Code</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    required
                                    maxLength={6}
                                    className="mt-2 bg-black/50 border-stone-700 text-white text-center text-2xl font-mono tracking-wider"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full bg-linear-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
                                size="lg"
                            >
                                {loading ? <Loader /> : 'Verify and Enable 2FA'}
                            </Button>
                        </form>
                    </div>
                )}
            </Card>
        </div>
    )
}

export default CreateMFA