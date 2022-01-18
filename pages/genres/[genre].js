import Link from "next/link";
import ArticleTitle from "../../components/atoms/ArticleTitle";
import { AnimeCard } from "../../components/molecules/AnimeCard/index";
import { Header } from "../../components/organisms/Header";
import PopularItems from "../../components/organisms/Popular";
import { apiURL } from "../../utils/constants";

export default function Genres(props) {
  const { data, popular } = props;
  const { data: DTGenre, pagination } = data;
  const { data: DTPopular } = popular;

  return (
    <>
      <Header title={`Genre - GigaNime`} />

      <main>
        <article>
          <ArticleTitle title={`Daftar Anime Genre`} />

          <div className="content grid grid-cols-2 gap-3 p-3">
            {DTGenre?.map((item, idx) => {
              return (
                <AnimeCard
                  path={item.path}
                  title={item.title}
                  img={item.img}
                  eps={item.eps}
                  key={idx}
                />
              );
            })}
          </div>

          <div className="pagination p-3">
            <span className="text-center block text-sm mb-2">
              Current page: {pagination?.current}
            </span>
            <div className="flex space-x-1 justify-center">
              {pagination?.prev ? (
                <a href={pagination?.prev} className="p-2 text-xs bg-gray-300">
                  «
                </a>
              ) : (
                <a href={"#"} className="p-2 text-xs text-gray-500 border">
                  «
                </a>
              )}
              {pagination?.links?.map((link, idx) => {
                return (
                  <a
                    href={link.link}
                    className={`p-2 text-xs bg-white text-blue-400 font-bold border
                    }`}
                    key={idx}
                  >
                    {link.text}
                  </a>
                );
              })}
              {pagination?.next ? (
                <Link href={pagination.next}>
                  <a href={"#"} className="p-2 text-xs text-gray-500 border">
                    »
                  </a>
                </Link>
              ) : (
                <a href={"#"} className="p-2 text-xs text-gray-500 border">
                  »
                </a>
              )}
            </div>
          </div>
        </article>

        <PopularItems data={DTPopular} />
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { genre } = ctx.query;
  const genreRes = await fetch(apiURL + "genres/" + genre);
  const popularRes = await fetch(apiURL + "popular");

  const errorCode = (await genreRes.ok) ? false : await genreRes.status;
  const data = await genreRes.json();
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
