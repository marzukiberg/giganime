import Link from "next/link";
import ArticleTitle from "../components/atoms/ArticleTitle";
import { Header } from "../components/organisms/Header";
import PopularItems from "../components/organisms/Popular";
import { apiURL } from "../utils/constants";

export default function Genres(props) {
  const { data, popular } = props;

  const lists = data?.data;

  return (
    <>
      <Header title="Daftar Genre Anime - GigaNime" />

      <main>
        <article>
          <ArticleTitle title={"Daftar Genre Anime"} />

          <div className="space-y-6 p-3">
            {lists?.map((item, idx) => {
              return (
                <div
                  className="border rounded shadow bg-white p-3 relative"
                  id={"letter-" + item.abjad}
                  key={idx}
                >
                  <h4 className="text-white text-xl font-bold bg-blue-400 w-8 h-8 flex items-center justify-center rounded-full mb-3 absolute left-1/2 top-0 transform -translate-y-1/2">
                    {item.abjad}
                  </h4>
                  <br />
                  {item.lists.map((list, idxList) => {
                    return (
                      <Link href={list.link}>
                        <div
                          className="cursor-pointer p-2 border-b hover:bg-blue-400 hover:bg-opacity-20"
                          role={"link"}
                          key={idxList}
                        >
                          {list.text}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </article>

        <PopularItems data={popular?.data} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const listRes = await fetch(apiURL + "genres");
  const popularRes = await fetch(apiURL + "popular");

  const errorCode = (await listRes.ok) ? false : await listRes.status;
  const data = await listRes.json();
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
