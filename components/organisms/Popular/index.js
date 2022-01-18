import ArticleTitle from "../../atoms/ArticleTitle";
import { AnimeList } from "../../molecules/AnimeCard";

export default function PopularItems(props) {
  const { data } = props;

  return (
    <article>
      <ArticleTitle title={"Terpopuler"} />

      <div className="content grid gap-3 p-3">
        {data?.map((item, idx) => {
          return (
            <AnimeList
              source={item.source}
              path={item.path}
              title={item.title}
              img={item.img}
              tags={item.tags}
              type={item?.type}
              key={idx}
            />
          );
        })}
      </div>
    </article>
  );
}

export async function getServerSideProps(context) {
  const SSProps = { props: { data: [] } };
  try {
    const res = await fetch("http://localhost:3000/api/popular/");
    const { ok } = await res;
    if (!ok) {
      swal("Error!", "Terjadi kesalahan saat memuat data!", "error");
      return SSProps;
    }

    SSProps.props.data = await res.json();
    return props;
  } catch (error) {
    swal("Error!", "Terjadi kesalahan saat memuat data!", "error");
    return SSProps;
  }
}
