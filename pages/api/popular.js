import { getPopular } from "../../db";

export default async function handler(req, res) {
  const data = await getPopular();
  res.status(200).json(data);
}
