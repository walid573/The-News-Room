import Link from "next/link";



interface MostReadNews {
    id:string,
    title: string,
}

const MostRead = async() => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read');
    const data = await res.json()
    const news:MostReadNews[] = data.data
    console.log(data);
    
    return (
        <div className="card py-4 px-7 border border-gray-300">
            <h2 className="font-bold pb-2 text-lg">সর্বাধিক পঠিত</h2>
            <div>
                {
                    news.map((n,i) => <div className="flex gap-2 py-1 font-semibold" key={n.id}>
                        <p className="text-lg font-bold text-red-800">{i+1}</p> <Link href={`/news/${n.id}`}><h2 className="text-md hover:text-red-600">{n.title}</h2></Link>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MostRead;