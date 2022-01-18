import { getSeries } from "../../../db";

export default async function handler(req, res) {
  const { slug } = req.query;

  const data = await getSeries(slug);

  res.json(data);
}
