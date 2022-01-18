import { getUpdated } from "../../../db";

export default async function handler(req, res) {
  const { page } = req.query;
  const data = await getUpdated(`page/${page}/`);
  res.status(200).json(data);
}
