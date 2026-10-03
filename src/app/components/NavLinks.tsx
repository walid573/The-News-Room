import Link from 'next/link';
import React from 'react';

interface NavLinksType{
    slug: string,
      title: string,
      topicId:string| null,
      url: string ,
      scrapable: boolean

}


const NavLinks = async() => {
    const res = await fetch('https://news-api-v2.vercel.app/api/categories')
    const data = await res.json();
    const navs:NavLinksType[] = data.data
    const filteredNavs = navs.filter(n => n.scrapable)
    
    
    return (
        <div className='flex gap-4 justify-center mt-5'>
            <Link className='hover:text-red-600' href={'/'}>হোম</Link>
            {
                filteredNavs.map((n,index)=><Link key={index} href={`/category/${n.slug}`} className='hover:text-red-600'>{n.title}</Link>)
            }
        </div>
    );
};

export default NavLinks;