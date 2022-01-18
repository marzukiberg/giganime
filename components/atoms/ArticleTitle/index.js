export default function ArticleTitle({ title, className }) {
  return (
    <h1
      className={
        "bg-blue-500 bg-opacity-10 p-2 text-center mx-3 rounded text-gray-700 " +
        className
      }
    >
      {title}
    </h1>
  );
}
