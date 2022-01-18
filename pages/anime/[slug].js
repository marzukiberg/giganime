import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ArticleTitle from "../../components/atoms/ArticleTitle";
import { Header } from "../../components/organisms/Header";
import PopularItems from "../../components/organisms/Popular";
import { apiURL } from "../../utils/constants";

export default function AnimeDetail(props) {
  const router = useRouter();
  const { slug } = router.query;
  const { data, popularData } = props;

  const dynamicIFrameSource = (source) => {
    if (data?.iframeSrc.includes("gdriveplayer.to")) {
      return data?.iframeSrc;
    }
    switch (source) {
      case "https://anime-indo.link/":
        return source.slice(0, -1) + data?.iframeSrc + "/";
      case "https://animeindo.one/":
        return data?.iframeSrc;
      default:
        return source.slice(0, -1) + data?.iframeSrc + "/";
    }
  };

  return (
    <>
      <Header title={`Nonton ${data?.title}`} />
      <main>
        <article>
          <ArticleTitle title={data?.title} />

          {/* content */}
          <div className="p-3 space-y-3">
            {/* iframe */}
            <div className="stream-frame">
              {data?.iframeSrc ? (
                <iframe
                  className="w-full h-52 -ml-1"
                  src={dynamicIFrameSource(data?.mainSource)}
                  allowFullScreen="true"
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"
                  marginWidth={0}
                  marginHeight={0}
                  scrolling="NO"
                  frameBorder={0}
                />
              ) : (
                <div className="text-xl text-center py-12 text-red-400">
                  Streaming tidak tersedia.
                </div>
              )}

              <span className="block mt-3 text-xs text-gray-500">
                Player bermasalah? tonton di{" "}
                <a
                  href={data?.mainSource + slug}
                  target={"_blank"}
                  className="text-blue-400"
                >
                  Source Asli
                </a>
              </span>
            </div>

            {/* pagination */}
            {data?.navigation?.all && (
              <div className="grid grid-cols-3 gap-3">
                <Link href={data?.navigation.before}>
                  <button className="bg-blue-400 text-white p-2">«</button>
                </Link>
                <Link href={data?.navigation.all}>
                  <button className="bg-blue-400 text-white p-2 text-xs">
                    <i className="fas fa-bars"></i>
                  </button>
                </Link>
                {data?.navigation.next !== "/anime/undefined/" ? (
                  <Link href={data?.navigation.next}>
                    <button className="bg-blue-400 text-white p-2">»</button>
                  </Link>
                ) : (
                  <button className="bg-blue-300 text-white p-2 cursor-not-allowed">
                    »
                  </button>
                )}
              </div>
            )}

            {/* downloads section */}
            {data?.downloads && (
              <table className="w-full table-auto rounded overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border text-center text-sm">Link</th>
                    <th className="p-3 border text-center text-sm">Quality</th>
                    <th className="p-3 border text-center text-sm">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.downloads.map((dl, idx) => {
                    return (
                      <tr>
                        <td className="p-3 border text-center text-sm">
                          <a
                            href={dl.link}
                            target={"_blank"}
                            className="text-blue-500"
                          >
                            Download {dl?.type && `(${dl.type})`}
                          </a>
                        </td>
                        <td className="p-3 border text-center text-sm">
                          {dl.quality}
                        </td>
                        <td className="p-3 border text-center text-sm">
                          {dl.size}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </article>

        <article>
          <ArticleTitle title={"Detail"} />

          <div className="p-3">
            <div className="text-center mb-3">
              <Image
                src={data?.img}
                width={130}
                height={184}
                alt={data?.title}
                objectFit={"cover"}
              />
              <span className="block text-center">{data?.title}</span>
            </div>

            <p className="text-sm text-justify">{data?.desc}</p>
          </div>
        </article>
        <PopularItems data={popularData?.data} />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const res = await fetch(apiURL + "detail/" + slug);
  const popularRes = await fetch(apiURL + "popular");

  const data = await res.json();
  const popularData = await popularRes.json();

  const { status } = await res;

  if (!data) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      data,
      popularData,
      error: {
        code: status,
        message: "Error loading server side.",
      },
    },
  };
}
