import Link from "next/link";
import ArticleTitle from "../components/atoms/ArticleTitle";
import { AnimeCard } from "../components/molecules/AnimeCard/index";
import { Header } from "../components/organisms/Header";
import PopularItems from "../components/organisms/Popular";
import { apiURL } from "../utils/constants";

export default function Home(props) {
  const { updated, popular } = props;
  const { data: DTUpdated, pagination } = updated;
  const { data: DTPopular } = popular;

  return (
    <>
      <Header />

      <main>
        <article>
          <ArticleTitle title={"Update terbaru"} />

          <div className="content grid grid-cols-2 gap-3 p-3">
            {DTUpdated?.map((item, idx) => {
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

          {/* pagination */}
          <div className="text-center my-6 space-x-3">
            {pagination?.prev && (
              <Link href={"?p=" + pagination.prev}>
                <button className="gap-x-2 px-3 py-2 bg-white border border-blue-400 rounded shadow text-gray-700 text-sm">
                  <span className="fas fa-caret-left fa-lg"></span> Before
                </button>
              </Link>
            )}
            {pagination?.next && (
              <Link href={"?p=" + pagination.next}>
                <button className="gap-2 px-3 py-2 bg-white border border-blue-400 rounded shadow text-gray-700 text-sm">
                  Next <span className="fas fa-caret-right fa-lg"></span>
                </button>
              </Link>
            )}
          </div>
        </article>

        <PopularItems data={DTPopular} />
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { p } = ctx.query || { p: "" };
  const updatedRes = await fetch(apiURL + "updated/" + p);
  const popularRes = await fetch(apiURL + "popular");

  const errorCode = (await updatedRes.ok) ? false : await updatedRes.status;
  const updated = await updatedRes.json();
  const popular = await popularRes.json();

  return {
    props: {
      updated,
      popular,
      error: {
        code: errorCode,
        message: "Error fetching server side props",
      },
    },
  };
}
