import { connection } from "../database/db.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  try {
    const getRental = await connection.query(`SELECT rentals.*, JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customers, JSON_BUILD_OBJECT('id', games.id,'name', games.name,'categoryId', games."categoryId", 'categoryName', categories.name) AS games FROM rentals JOIN customers ON customers.id = "customerId" JOIN games ON games.id = "gameId" JOIN categories ON categories.id = games."categoryId" `);
  return res.send(getRental.rows)
} catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

export async function insertRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const rentDate = dayjs().format("YYYY-MM-DD");
  const returnDate = null;
  const delayfee = null;
  const validateCustomerId = await connection.query(
    "SELECT * FROM customers WHERE id = $1",
    [customerId]
  );
  if (validateCustomerId.rows.length === 0) {
    return res.status(400).send("cliente nao encontrando");
  }
  const validateGameId = await connection.query(
    "SELECT * FROM games WHERE id=$1",
    [gameId]
  );
  if (validateGameId.rows.length === 0) {
    return res.status(400).send("jogo nao encontrando");
  }
  console.log(validateGameId.rows[0].pricePerDay);
  const originalPrice = Number(validateGameId.rows[0].pricePerDay) * daysRented;
  try {
    const insertion = await connection.query(
      'INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayfee,
      ]
    );
    return res.send(insertion);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}
