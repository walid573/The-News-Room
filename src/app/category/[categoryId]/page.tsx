import NewsCard from '@/app/components/NewsCard';
import React from 'react';

interface CatergoryNew {
    categoryId:string
    id: string,
    title: string,
    description:string,
    category: string,
    imageUrl: string,
    imageAlt: string
}



const CategoryNews = async ({params}: {params:CatergoryNew}) => {
    const {categoryId} = await params
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`);
    const data = await res.json();
    const categoryNews:CatergoryNew[] = data.data
    
    
    return (
        <div className=' px-4 '>
            <h2 className='text-2xl font-bold py-2 border-b-2 border-red-800'>{data.title} </h2>
            <div className='grid grid-cols-3 gap-4 py-4'>
                {
                    categoryNews.map(news => <NewsCard key={news.id} news={news}/>)
                }
            </div>
        </div>
    );
};

export default CategoryNews;