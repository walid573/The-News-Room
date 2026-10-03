

import MainNews from "./components/MainNews";
import NewsCard from "./components/NewsCard";
import MostRead from "./components/MostRead";


interface IOtherSection {
  curationId: string,
  curationType: string
  title: string,
  articles:{
    id: string,
    title: string,
    description: string,
    category: string,
    imageUrl: string,
  imageAlt: string
  }[];
}




export default async function Home() {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections');
  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles
  

  const otherSections:IOtherSection[] = sections.slice(1)
  const filerOtherSection = otherSections.filter(osf => osf.curationType?.toLowerCase().includes("vivo-stream")) ;
  console.log(otherSections);
  
  
  return (
     <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <MainNews news={mainNews} />

        {filerOtherSection.map((section) => (
          <section className="mt-5" key={section.curationId}>
            <h2 className="mb-3 border-b-2 border-red-700 pb-2 text-lg font-bold text-neutral-900">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {section.articles.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <aside>
        <MostRead />
      </aside>
    </div>
  );
}
