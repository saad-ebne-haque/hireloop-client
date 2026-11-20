"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const GoogleLoginBTN = () => {

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
        <>
            <Button onClick={handleGoogleLogin}>Google Login</Button>

        </>
    );
};

export default GoogleLoginBTN;