import { getDetail } from "../../../db";

export default async function handler(req, res) {
  const { slug } = req.query;

  const data = await getDetail(slug);

  res.json(data);
}
