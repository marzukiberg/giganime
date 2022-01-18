import { getAnimeByGenre } from "../../../db";

export default async function handler(req, res) {
  const { genre } = req.query;

  const data = await getAnimeByGenre(genre);
  res.status(200).json(data);
}
