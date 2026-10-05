'use client'

import { signUp } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";

const SignUpPage = () => {
    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const users = Object.fromEntries(formData.entries()) as { name: string, email: string, image: string, password: string };
        const { data, error } = await signUp.email({
            ...users,
            callbackURL: '/',
        });
        if (data) {
            console.log(data);
            redirect('/')

        }
        if (error) {
            console.log(error);

        }

    }
    return (
        <>
            <main className=" mx-auto w-full max-w-7xl px-4 py-6">

                <div className='mx-auto max-w-sm '>
                    <h2 className="mb-6 text-center text-2xl font-bold text-red-700">সাইন আপ</h2>
                    <form action="" className='flex justify-center' onSubmit={onSubmit}>
                        <fieldset className="fieldset w-lg  p-4">


                            <label className="label text-sm text-neutral-700">নাম</label>
                            <input name='name' type="text" className="input w-sm rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-red-700" />
                            <label className="label">ইমেইল</label>
                            <input name='email' type="email" className="input w-sm px-3 py-2" placeholder="Email" /> <label className="label">ImageURL</label>
                            <input
                                name="image"
                                type="url"
                                className="input w-sm"
                                placeholder="Image"
                            />

                            <label className="label">পাসওয়ার্ড</label>
                            <input name='password' type="password" className="input w-sm px-3 py-2 " placeholder="Password" />


                            <button type='submit' className="btn bg-red-600 text-white mt-4 w-sm">সাইন আপ করুন</button>
                        </fieldset>
                    </form>
                </div>
            </main>
        </>
    );
};

export default SignUpPage;