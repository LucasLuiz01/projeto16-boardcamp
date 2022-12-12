import { connection } from "../database/db.js";
export async function listGames(req, res) {
  const nome = req.query.name;
  console.log(nome)
  if(nome){
    try {
      const list = await connection.query(
        `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.name LIKE '${nome}%';`);
      return res.send(list.rows);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
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
