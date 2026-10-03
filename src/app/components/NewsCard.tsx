import Image from "next/image";
import Link from "next/link";

interface News {
    id: string,
    title: string,
    description:string,
    category: string,
    imageUrl: string,
    imageAlt: string

}
const NewsCard = ({news}:{news:News}) => {
    return (
        <Link href={`/news/${news.id}`} className="block h-full">
      <article className="card h-full overflow-hidden bg-base-100 shadow-sm transition-shadow hover:shadow-md">
        <figure className="relative aspect-video w-full">
          <Image
            src={news.imageUrl}
            alt={news.imageAlt || news.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
            className="object-cover"
          />
        </figure>

        <div className="card-body flex-1 gap-2 p-4">
          <p className="text-sm font-semibold text-red-600">{news.category}</p>
          <h2 className="line-clamp-3 text-lg font-bold leading-snug text-neutral-900">
            {news.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600">
            {news.description}
          </p>
        </div>
      </article>
    </Link>
    );
};

export default NewsCard;