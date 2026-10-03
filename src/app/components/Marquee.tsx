import Link from "next/link";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Headlines {
    id:string,
    title: string
}


const Marquee = async() => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news?limit=10');
    const data = await res.json();
    const headlines:Headlines[] = data.data
 
    
    return (
        <div className="bg-red-700 text-white mb-2  ">
            <div className="flex max-w-7xl mx-auto">
                <h2 className="bg-red-800 px-2 text-center py-1 font-bold">সর্বশেষ</h2>
            <MarqueeText direction="right" duration={10} className="py-1">
            {
                headlines.map(h=>(
                    <span key={h.id}>
                        <Link  href={`/news/${h.id}`}>
                        <span className="hover:underline">{h.title}</span>
                        </Link>
                        <span className='mx-5'>•</span>
                    </span>)
                )
            }
            </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;