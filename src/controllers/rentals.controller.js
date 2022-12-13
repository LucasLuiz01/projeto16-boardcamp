import { connection } from "../database/db.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;
  if (customerId) {
    try {
      const getCustomerId = await connection.query(
        `SELECT rentals.*, JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customers, JSON_BUILD_OBJECT('id', games.id,'name', games.name,'categoryId', games."categoryId", 'categoryName', categories.name) AS games FROM rentals JOIN customers ON customers.id = "customerId" JOIN games ON games.id = "gameId" JOIN categories ON categories.id = games."categoryId" WHERE "customerId" = $1`,
        [customerId]
      );
      if (getCustomerId.rows.length === 0) {
        return res.status(404).send("Id nao encontrado no alugel do cliente");
      }
      return res.send(getCustomerId.rows);
    } catch (err) {
      console.log(err);
      return res.status(501).send(err);
    }
  }
  if (gameId) {
    try {
      const getgameId = await connection.query(
        `SELECT rentals.*, JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customers, JSON_BUILD_OBJECT('id', games.id,'name', games.name,'categoryId', games."categoryId", 'categoryName', categories.name) AS games FROM rentals JOIN customers ON customers.id = "customerId" JOIN games ON games.id = "gameId" JOIN categories ON categories.id = games."categoryId" WHERE "gameId" = $1`,
        [gameId]
      );
      if (getgameId.rows.length === 0) {
        return res
          .status(404)
          .send("Id do jogo nao encontrado na lista de alugueis");
      }
      return res.send(getgameId.rows[0]);
    } catch (err) {
      console.log(err);
      return res.status(501).send(err);
    }
  }
  try {
    const getRental = await connection.query(
      `SELECT rentals.*, JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customers,  JSON_BUILD_OBJECT('id', games.id,'name', games.name,'categoryId', games."categoryId", 'categoryName', categories.name) AS games FROM rentals JOIN customers ON customers.id = "customerId" JOIN games ON games.id = "gameId" JOIN categories ON categories.id = games."categoryId" `
    );
    return res.send(getRental.rows);
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
  const estoqueTotal = validateGameId.rows[0].stockTotal;
  const aluguados = await connection.query(
    `SELECT * FROM rentals WHERE "gameId" = ${gameId} AND "returnDate" IS null;`
  );
  console.log("EstoqueTotal", estoqueTotal);
  console.log("aluguados", aluguados.rows);
  if (aluguados.rows.length >= estoqueTotal) {
    return res.status(400).send("Jogo indisponivel, quantidades já alugadas");
  }
  if (validateGameId.rows.length === 0) {
    return res.status(400).send("jogo nao encontrando");
  }

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

export async function finalizarAluguel(req, res) {
  const id = req.params.id;
  let delayFee = null;
  const returnDate = dayjs().format("YYYY-MM-DD");
  const validation = await connection.query(
    "SELECT * FROM rentals WHERE id = $1",
    [id]
  );
  if (validation.rows.length === 0) {
    return res.status(404).send("Id nao encontrado");
  }
  if (validation.rows[0].returnDate !== null) {
    return res.status(400).send("Jogo já devolvido");
  }
  const rentDates = validation.rows[0].rentDate.getTime();
  const birthday = Date.now();
  const dias = Math.abs(parseInt((rentDates - birthday) / 86400000));
  const te = validation.rows[0].originalPrice;
  if (dias > validation.rows[0].daysRented) {
    delayFee = (dias - validation.rows[0].daysRented) * te;
  }
  try {
    const updateRentals = await connection.query(
      'UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id = $3',
      [returnDate, delayFee, id]
    );
    res.send(updateRentals);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function deleteRentals(req, res) {
  const id = req.params.id;
  const validation = await connection.query(
    "SELECT * FROM rentals WHERE id = $1",
    [id]
  );
  if (validation.rows.length === 0) {
    return res.status(404).send("Id nao encontrado");
  }
  if (validation.rows[0].returnDate === null) {
    return res.status(400).send("Jogo ainda Nao devolvido");
  }
  try {
    await connection.query("DELETE FROM rentals WHERE id = $1", [id]);
    return res.send("Deletado com sucesso");
  } catch (err) {
    return res.status(500).send(err);
  }
}
