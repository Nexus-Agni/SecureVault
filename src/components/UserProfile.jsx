import { account } from "@/lib/appwrite";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FaUserCircle, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import { Loader } from "@/components/Loader";

function UserProfile() {
    const navigate = useNavigate();
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updatedName, setUpdatedName] = useState("");
    const [originalPassword, setOriginalPassword] = useState("");
    const [updatedPassword, setUpdatedPassword] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showOriginalPassword, setShowOriginalPassword] = useState(false);
    const [showUpdatedPassword, setShowUpdatedPassword] = useState(false);
    
    // Modal states
    const [showNameModal, setShowNameModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await account.get();
                setUser(userData);
                setUpdatedName(userData.name || "");
                setUpdatedEmail(userData.email || "");
            } catch (error) {
                toast.error("Please log in to access your profile");
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);
    const updateEmailHandler = async (e) => {
        e.preventDefault();
        try {
            if (updatedEmail === "") {
                toast.error("Please enter an email address");
                return;
            }
            if (originalPassword === "") {
                toast.error("Please enter your password");
                return;
            }
            if (updatedEmail === user.email) {
                toast.error("Please enter a different email address");
                return;
            }
            const updatedUser = await account.updateEmail(
                updatedEmail,
                originalPassword
            );
            console.log("updateEmail response: ", updatedUser);
            toast.success("Email updated successfully");
            setUser(updatedUser);
            setOriginalPassword("");
            setShowEmailModal(false);
        } catch (error) {
            console.log("Update Email Error", error);
            if (error.code === 401 || error.message.includes('password')) {
                toast.error("Incorrect password");
            } else if (error.code === 409) {
                toast.error("This email is already in use");
            } else {
                toast.error(error.message || "Something went wrong while updating email");
            }
        }
    }

    const updateNameHandler = async (e) => {
        e.preventDefault();
        try {
            if (updatedName === "") {
                toast.error("Please enter a name");
                return;
            }
            if (updatedName === user.name) {
                toast.error("Please enter a different name");
                return;
            }
            const updatedUser = await account.updateName(updatedName);
            console.log("updateName response: ", updatedUser);
            toast.success("Name updated successfully");
            setUser(updatedUser);
            setShowNameModal(false);
        } catch (error) {
            console.log("Update Name Error", error);
            toast.error(error.message || "Something went wrong while updating name");
        }
    }

    const updatePasswordHandler = async (e) => {
        e.preventDefault();
        try {
            if (updatedPassword === "") {
                toast.error("Please enter a new password");
                return;
            }
            if (originalPassword === "") {
                toast.error("Please enter your current password");
                return;
            }
            if (updatedPassword.length < 8) {
                toast.error("Password must be at least 8 characters");
                return;
            }
            if (updatedPassword === originalPassword) {
                toast.error("New password must be different from current password");
                return;
            }
            await account.updatePassword(
                updatedPassword,
                originalPassword
            );
            toast.success("Password updated successfully");
            setOriginalPassword("");
            setUpdatedPassword("");
            setShowPasswordModal(false);
        } catch (error) {
            console.log("Update Password Error", error);
            if (error.code === 401 || error.message.includes('Invalid credentials')) {
                toast.error("Incorrect current password");
            } else {
                toast.error(error.message || "Something went wrong while updating password");
            }
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-[#22040b] via-[#120006] to-black flex">
            {/* Shared Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-stone-900/95 backdrop-blur-sm border-b border-stone-700">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/40 flex items-center justify-center">
                                <FaUserCircle className="text-red-500 text-xl" />
                            </div>
                            <div>
                                <h1 className="text-white text-2xl font-bold">Profile Settings</h1>
                                <p className="text-stone-400 text-sm">Manage your account details</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                            <Loader />
                        </div>
                    ) : (
                        <div className="max-w-225 mx-auto p-4 md:p-8">
                            {/* User Info Card */}
                            <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-8 mb-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-red-500/20 to-red-600/20 border-4 border-red-500/40 flex items-center justify-center">
                                        <FaUserCircle className="text-red-500 text-5xl" />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-white text-2xl font-bold">{user?.name || 'User'}</h2>
                                        <p className="text-stone-400">{user?.email}</p>
                                        <p className="text-stone-500 text-sm mt-1">
                                            Joined: {new Date(user?.$createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Update Name Button */}
                                <button
                                    onClick={() => setShowNameModal(true)}
                                    className="group bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border border-stone-700 hover:border-blue-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                                >
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <FaUser className="text-blue-500 text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Update Name</h3>
                                            <p className="text-stone-400 text-sm">Change your display name</p>
                                        </div>
                                    </div>
                                </button>

                                {/* Update Email Button */}
                                <button
                                    onClick={() => setShowEmailModal(true)}
                                    className="group bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border border-stone-700 hover:border-green-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                                >
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <FaEnvelope className="text-green-500 text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Update Email</h3>
                                            <p className="text-stone-400 text-sm">Change your email address</p>
                                        </div>
                                    </div>
                                </button>

                                {/* Update Password Button */}
                                <button
                                    onClick={() => setShowPasswordModal(true)}
                                    className="group bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border border-stone-700 hover:border-red-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                                >
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <FaLock className="text-red-500 text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Update Password</h3>
                                            <p className="text-stone-400 text-sm">Change your password</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Update Name Modal */}
            {showNameModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-linear-to-br from-stone-900 via-black to-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                                    <FaUser className="text-blue-500" />
                                </div>
                                <h3 className="text-white font-bold text-xl">Update Name</h3>
                            </div>
                            <button
                                onClick={() => setShowNameModal(false)}
                                className="text-stone-400 hover:text-white transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <form onSubmit={updateNameHandler} className="space-y-4">
                            <div>
                                <Label htmlFor="modal-name" className="text-stone-300">Full Name</Label>
                                <Input
                                    id="modal-name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                    className="bg-stone-900/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    onClick={() => setShowNameModal(false)}
                                    className="flex-1 bg-stone-800 hover:bg-stone-700 text-white rounded-full h-10"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full h-10 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                >
                                    <FaCheck className="mr-2" />
                                    Update
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Update Email Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-linear-to-br from-stone-900 via-black to-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                    <FaEnvelope className="text-green-500" />
                                </div>
                                <h3 className="text-white font-bold text-xl">Update Email</h3>
                            </div>
                            <button
                                onClick={() => {
                                    setShowEmailModal(false);
                                    setOriginalPassword('');
                                }}
                                className="text-stone-400 hover:text-white transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <form onSubmit={updateEmailHandler} className="space-y-4">
                            <div>
                                <Label htmlFor="modal-email" className="text-stone-300">Email Address</Label>
                                <Input
                                    id="modal-email"
                                    type="email"
                                    placeholder="Enter new email"
                                    value={updatedEmail}
                                    onChange={(e) => setUpdatedEmail(e.target.value)}
                                    className="bg-stone-900/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <Label htmlFor="modal-email-password" className="text-stone-300">Current Password</Label>
                                <div className="relative">
                                    <Input
                                        id="modal-email-password"
                                        type={showOriginalPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={originalPassword}
                                        onChange={(e) => setOriginalPassword(e.target.value)}
                                        className="bg-stone-900/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowOriginalPassword(!showOriginalPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-green-400 transition-colors"
                                    >
                                        {showOriginalPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setShowEmailModal(false);
                                        setOriginalPassword('');
                                    }}
                                    className="flex-1 bg-stone-800 hover:bg-stone-700 text-white rounded-full h-10"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-linear-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-full h-10 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                >
                                    <FaCheck className="mr-2" />
                                    Update
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Update Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-linear-to-br from-stone-900 via-black to-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                                    <FaLock className="text-red-500" />
                                </div>
                                <h3 className="text-white font-bold text-xl">Update Password</h3>
                            </div>
                            <button
                                onClick={() => {
                                    setShowPasswordModal(false);
                                    setOriginalPassword('');
                                    setUpdatedPassword('');
                                }}
                                className="text-stone-400 hover:text-white transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <form onSubmit={updatePasswordHandler} className="space-y-4">
                            <div>
                                <Label htmlFor="modal-current-password" className="text-stone-300">Current Password</Label>
                                <div className="relative">
                                    <Input
                                        id="modal-current-password"
                                        type={showOriginalPassword ? "text" : "password"}
                                        placeholder="Enter current password"
                                        value={originalPassword}
                                        onChange={(e) => setOriginalPassword(e.target.value)}
                                        className="bg-stone-900/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 pr-10"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowOriginalPassword(!showOriginalPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-red-400 transition-colors"
                                    >
                                        {showOriginalPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="modal-new-password" className="text-stone-300">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="modal-new-password"
                                        type={showUpdatedPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        value={updatedPassword}
                                        onChange={(e) => setUpdatedPassword(e.target.value)}
                                        minLength={8}
                                        className="bg-stone-900/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowUpdatedPassword(!showUpdatedPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-red-400 transition-colors"
                                    >
                                        {showUpdatedPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {updatedPassword && updatedPassword.length < 8 && (
                                    <p className="text-xs text-red-400 mt-1">Password must be at least 8 characters</p>
                                )}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setOriginalPassword('');
                                        setUpdatedPassword('');
                                    }}
                                    className="flex-1 bg-stone-800 hover:bg-stone-700 text-white rounded-full h-10"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full h-10 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                >
                                    <FaCheck className="mr-2" />
                                    Update
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;