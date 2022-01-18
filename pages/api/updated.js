import { getUpdated } from "../../db";

export default async function handler(req, res) {
  const data = await getUpdated();
  res.status(200).json(data);
}
