import { connection } from "../database/db.js";

export async function getCustomersCpf (req, res) {
  const cpfQ = req.query.cpf;
  console.log(cpfQ)
  if(cpfQ){
    try {
      const buscaSem = await connection.query(`SELECT * FROM customers WHERE cpf LIKE '${cpfQ}%';`)
      return res.send(buscaSem.rows);
  } catch(err) {
    return res.status(500).send(err);
  }
  }
  try {
    const busca = await connection.query(`SELECT * FROM customers`)
    return res.send(busca.rows);
} catch(err) {
  return res.status(500).send(err);
}
}
export async function getCustomersById(req, res){
  const idP = req.params.id
  console.log(idP.rows)
  try{
    const list = await connection.query("SELECT * FROM customers WHERE id = $1", [idP]);

    res.send(list.rows[0])
  }catch(err){
    return res.status(500).send(err);
  }
}

export async function insertCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  console.log(typeof name);
  console.log(typeof phone);
  console.log(cpf.length);
  const cpfExist = await connection.query(
    `SELECT * FROM customers WHERE cpf='${cpf}'`
  );
  if (cpfExist.rows.length > 0) {
    return res.sendStatus(409);
  }
  try {
    const insertion = await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err);
  }
}
