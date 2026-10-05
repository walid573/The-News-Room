'use client'

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "react-toastify";

const SignInPage = () => {

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as { email: string, password: string };

        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: '/'
        })
        if (data) {
            toast.success(`Successfully logged In`)

        }
        if (error) {
            toast.error(error.message)
            console.log(error);

        }
    }
    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        console.log(data);

    }
    const handleGithubSignIn =  async()=>{
        const data = await authClient.signIn.social({
        provider: "github"
    });
    console.log(data);
    
    }

    return (
        <main className="   px-4 pt-6">

            <div className='mx-auto max-w-sm  '>
                <h2 className="mb-6 text-center text-2xl font-bold text-red-700">সাইন ইন</h2>
                <form action="" className='flex justify-center' onSubmit={onSubmit}>
                    <fieldset className="fieldset w-md  p-4">



                        <label className="label">ইমেইল</label>
                        <input name='email' type="email" className="input w-sm " placeholder="Email" />

                        <label className="label">Password</label>
                        <input name='password' type="password" className="input w-sm  " placeholder="Password" />


                        <button type='submit' className="btn bg-red-600 text-white mt-4 w-sm">সাইন আপ করুন</button>
                    </fieldset>
                </form>
                <div className="flex items-center justify-center gap-5">
                    <button onClick={handleGoogleSignIn} className="btn ">Sign In With Google</button>
                <button onClick={handleGithubSignIn} className="btn ">Sign In With Github</button>
                </div>
            </div>
        </main>
    );
};

export default SignInPage;