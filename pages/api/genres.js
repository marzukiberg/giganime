import { getGenres } from "../../db";

export default async function handler(req, res) {
  const data = await getGenres();
  res.status(200).json(data);
}
