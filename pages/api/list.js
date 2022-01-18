import { getAnimeList } from "../../db";

export default async function handler(req, res) {
  const { letter } = req.query;
  const data = await getAnimeList(letter ? "?letter=" + letter : "");
  res.status(200).json(data);
}
