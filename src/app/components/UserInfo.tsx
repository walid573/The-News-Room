'use client'

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';


const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user
    console.log(user);
    const handleSignOut = async () => {
        await authClient.signOut()
    }
    return (
        <>
            <div className="flex items-center justify-end gap-3 text-sm">
                {
                    user ? <div className="flex flex-col items-center gap-2">
                        <Link href={"/profile"}>
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                <img
                                    alt="Tailwind-CSS-Avatar-component"
                                    src={user?.image as string}
                                />
                            </div>
                        </div></Link>
                        <h2 className='text-md font-bold text-red-700 '>{user.name}</h2>
                        
                        <button onClick={handleSignOut} className='btn rounded btn-sm bg-red-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-800'>Sign Out</button>
                    </div> : <div className="flex items-center justify-end gap-3 text-sm">
                        <Link
                            href="/sign-in"
                            className="text-neutral-700 transition-colors hover:text-red-700"
                        >
                            সাইন ইন
                        </Link>
                        <Link
                            href="/sign-up"
                            className="rounded bg-red-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-800"
                        >
                            সাইন আপ
                        </Link>
                    </div>
                }
            </div>

        </>

    );
};

export default UserInfo;