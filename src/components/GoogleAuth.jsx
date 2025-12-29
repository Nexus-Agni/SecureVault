import { account } from "@/lib/appwrite"
import { OAuthProvider } from "appwrite"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FaGoogle } from "react-icons/fa"

function GoogleAuth() {
    const googleAuthHandler = async (e) => {
        e.preventDefault()
        try {
            account.createOAuth2Session({
                provider : OAuthProvider.Google,
                success : `${window.location.origin}/oauth-callback`,
                failure : `${window.location.origin}/login`
            
            })
        } catch (error) {
            toast.error(error.message || "Something went wrong while logging in using Google")
        }
    }
  return (
    <Button
      type="button"
      onClick={googleAuthHandler}
      variant="outline"
      className="w-full border-neutral-700 bg-neutral-900/50 text-white hover:bg-neutral-800 hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
      size="lg"
    >
      <FaGoogle className="mr-2 h-4 w-4 text-red-400" />
      Google
    </Button>
  )
}

export default GoogleAuth