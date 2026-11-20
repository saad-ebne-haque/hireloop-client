"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

function GoogleLoginBTN() {

    const handleGoogleLogin = async () => {

        const { data, error } = await authClient.signIn.social({
            provider: 'google',
            callbackURL: '/'
        });
        
        if (error) {
            console.log(error);
        } else {
            console.log(data);
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