import Image from "next/image";
import Link from "next/link";
import css from "../../../styles/Home.module.css";
import { server1, server2 } from "../../../utils/constants";

export const AnimeCard = ({ path, title, img, eps }) => {
  return (
    <Link href={path}>
      <div className="cursor-pointer rounded relative overflow-hidden transform hover:-translate-y-1 duration-300 h-64">
        <Image
          src={img}
          layout="fill"
          quality={100}
          alt={title}
          objectFit={"cover"}
        />
        <div className="absolute bottom-0 w-full bg-black bg-opacity-90 p-2 text-sm">
          <h4 className={"text-white mb-2 " + css["text-wrap-1"]}>{title}</h4>
          <div className="text-xs">
            <span className="text-blue-500">{eps}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const AnimeList = ({ source, path, title, img, tags, type }) => {
  const renderByServer = () => {
    switch (source) {
      case server1:
        return <span className="text-blue-500">{type}</span>;
      case server2:
        return (
          <>
            <span className="text-gray-500">Genres:</span>
            <span>{tags}</span>
          </>
        );
      default:
        return (
          <>
            <span className="text-gray-500">Genres:</span>
            <span>{tags}</span>
          </>
        );
    }
  };
  return (
    <Link href={path}>
      <div className="cursor-pointer rounded relative flex border hover:bg-blue-400 hover:bg-opacity-10 duration-300">
        <div className="w-16 relative">
          <Image src={img} layout="fill" alt={title} objectFit={"cover"} />
        </div>
        <div className="p-3 flex-1">
          <h4 className="text-sm mb-2 font-bold">{title}</h4>
          <p className="text-xs">{renderByServer()}</p>
        </div>
      </div>
    </Link>
  );
};
