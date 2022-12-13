import { connection } from "../database/db.js";

export async function getCustomersCpf (req, res) {
  const cpfQuery = Number(req.query.cpf);
  console.log(typeof(cpfQuery))
  if(cpfQuery){
    try {
      const buscaCpf = await connection.query(`SELECT * FROM customers WHERE cpf LIKE '${cpfQuery}%';`)
      return res.send(buscaCpf.rows);
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
  try{
    const list = await connection.query("SELECT * FROM customers WHERE id = $1", [idP]);
    if(list.rows.length === 0) {
      return res.sendStatus(404)
    }else{
      return res.send(list.rows[0]);
    }
    
  }catch(err){
    return res.status(500).send(err);
  }
}

export async function insertCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
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

export async function updateUser (req, res){
  const id = req.params.id;
  const {name, phone, cpf, birthday} = req.body;
  //const cpfExist = await connection.query(
  //  `SELECT * FROM customers WHERE cpf='${cpf}'`
  //);
  //if (cpfExist.rows.length > 0) {
   // return res.sendStatus(409);
 // }
try {
 await connection.query("UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5",[name, phone, cpf, birthday, id]);
return res.send("USUARIO ATUALIZADO COM SUCCESO")
}catch(err){
  console.log(err);
  return res.status(500).send(err)
}
}