import Image from "next/image";
import Link from "next/link";
import ArticleTitle from "../../components/atoms/ArticleTitle";
import { Header } from "../../components/organisms/Header";
import { apiURL } from "../../utils/constants";

export default function Series(props) {
  const { data } = props;
  const content = data?.content;
  const episodes = data?.episodeList;

  const keywords = content?.tags
    ? [...content.tags, content.title]
    : [content.title];
  return (
    <>
      <Header title={"Anime  - GigaNime"} keywords={keywords.join(", ")} />

      <main className="p-3">
        {/* thumb cover */}
        {content?.thumb && (
          <div className="relative mb-24">
            <Image
              src={content.thumb}
              width={400}
              height={200}
              layout="responsive"
              objectFit="cover"
              quality={100}
              objectPosition={"top"}
            />
            <div className="bg-black absolute w-full h-full inset-0 z-1 bg-opacity-50"></div>
            <div className="absolute left-1/2 top-1/2 w-32 h-48 transform -translate-x-1/2">
              <Image
                src={content.thumb}
                layout="fill"
                objectFit="contain"
                quality={100}
              />
            </div>
          </div>
        )}

        {/* content */}
        <div className="p-3 space-y-3">
          <ArticleTitle
            title={content.title}
            className={"text-2xl font-bold"}
          />
          <p className="text-gray-700 text-center">{content.desc}</p>
          <div className="info_content">
            {content?.infoContent?.map((item, idx) => {
              return (
                <div className="p-2 border-b text-sm" key={idx}>
                  {item}
                </div>
              );
            })}
          </div>
          <div className="tags flex flex-wrap" style={{ gap: 12 }}>
            {content?.tags?.map((item, idx) => {
              return (
                <div className="inline text-sm rounded text-blue-400" key={idx}>
                  #{item}
                </div>
              );
            })}
          </div>

          {/* episodes */}
          <ArticleTitle title={"Daftar Episode"} />
          <div className="h-72 overflow-scroll">
            <div className="grid grid-cols-5" style={{ gap: 12 }}>
              {episodes?.map((item, idx) => (
                <Link href={item.link} key={idx}>
                  <div className="cursor-pointer px-4 py-2 rounded bg-blue-400 text-white text-center">
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { slug } = ctx.query;
  const series = await fetch(apiURL + "series/" + slug);
  const popularRes = await fetch(apiURL + "popular");

  const errorCode = (await series.ok) ? false : await series.status;
  const data = await series.json();
  const popular = await popularRes.json();

  return {
    props: {
      data,
      popular,
      error: {
        code: errorCode,
        message: "Error fetching server side props",
      },
    },
  };
}
