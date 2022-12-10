import { connection } from "../database/db.js";
export async function listGames(req, res) {
  try {
    const list = await connection.query(
      'SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id'
    );
    res.send(list.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function insertGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  const validation = await connection.query(
    `SELECT * FROM categories WHERE id = ${categoryId}`
  );
  if ((validation.rows.length = 0)) {
    return res.sendStatus(400);
  }
  try {
    const insertion = await connection.query(
      `INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES('${name}', '${image}', ${stockTotal}, ${categoryId}, ${pricePerDay});`
    );
    res.send(insertion);
  } catch (err) {
    res.status(500).send(err);
  }
}
