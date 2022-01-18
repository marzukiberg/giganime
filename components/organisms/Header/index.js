import Head from "next/head";
import Link from "next/link";
import MenuLink from "./MenuLink";

export const Header = ({
  title = "GigaNime - Website Streaming Film Indonesia",
  keywords = "",
}) => {
  const defaultKeywords =
    "anime, otaku, wibu, naruto, one piece, anime tv, anime series, anime populer, anime terbaru";
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="GigaNime - Website Streaming Film Indonesia"
        />
        <meta
          name="keywords"
          content={
            keywords ? keywords + ", " + defaultKeywords : defaultKeywords
          }
        />
      </Head>

      <header className="bg-blue-500 mb-3">
        <div className="p-3">
          <Link href="/">
            <a href="#">
              <h1 className="text-2xl text-white text-center">GigaNime</h1>
            </a>
          </Link>
        </div>
        {/* menu */}
        <div className="flex justify-around bg-gray-700 text-sm">
          <MenuLink to="/list" label={"List"} />
          <MenuLink to="/genres" label={"Genre"} />
          <MenuLink to="/movie" label={"Movie"} />
          <MenuLink to="/jadwal" label={"Jadwal"} />
        </div>
        {/* searchbar */}
        <div className="p-3">
          <div className="flex">
            <input
              type="text"
              className="h-8 text-sm px-2 w-full bg-white border"
              placeholder="Cari anime..."
            />
            <button className="text-white px-2 bg-blue-400 text-sm">
              Cari
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
