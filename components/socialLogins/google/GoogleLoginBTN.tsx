"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { authClient, GOOGLE_SIGN_IN_PENDING_KEY } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/error-message";
import { toast } from "sonner";

function GoogleLoginBTN() {

    const handleGoogleLogin = async () => {
        window.sessionStorage.setItem(GOOGLE_SIGN_IN_PENDING_KEY, "true")

        try {
            const { error } = await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/dashboard',
                errorCallbackURL: '/',
            });

            if (error) {
                window.sessionStorage.removeItem(GOOGLE_SIGN_IN_PENDING_KEY)
                console.error("Google sign-in failed:", error)
                toast.error("Google sign-in failed", {
                    description: getErrorMessage(
                        error,
                        "Unable to continue with Google. Please try again."
                    ),
                })
            }
        } catch (error) {
            window.sessionStorage.removeItem(GOOGLE_SIGN_IN_PENDING_KEY)
            console.error("Google sign-in failed:", error)
            toast.error("Google sign-in failed", {
                description: getErrorMessage(
                    error,
                    "Unable to continue with Google. Please try again."
                ),
            })
        }
    }

    return (
        <Button
            className="h-12 w-full rounded-xl border border-white/15 bg-[#202124] text-white hover:bg-[#2a2a2a] hover:text-white dark:bg-[#202124] dark:text-white dark:hover:bg-[#2a2a2a] dark:hover:text-white"
            onClick={handleGoogleLogin}
            type="button"
            variant="ghost"
        >
            <Image
                alt=""
                aria-hidden="true"
                className="size-5"
                height={20}
                src="/images/google-g-logo.png"
                width={20}
            />
            Continue with Google
        </Button>
    );
}

export default GoogleLoginBTN;