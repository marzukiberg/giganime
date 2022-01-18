import { getJadwal } from "../../db";

export default async function handler(req, res) {
  const data = await getJadwal();
  res.status(200).json(data);
}
