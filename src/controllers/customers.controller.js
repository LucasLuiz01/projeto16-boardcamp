import { connection } from "../database/db.js"

export async function insertCustomers (req, res){
    const {name, phone, cpf, birthday} = req.body;
    console.log(typeof(name));
    console.log(typeof(phone));
    console.log(cpf.length);
    const cpfExist = await connection.query(`SELECT * FROM customers WHERE cpf='${cpf}'`)
if(cpfExist.rows.length > 0){
   return res.sendStatus(409);
}
try{
    const insertion = await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES($1, $2, $3, $4)`,[name, phone, cpf, birthday])
    return res.sendStatus(200);
}catch(err){
 return res.status(500).send(err)
}
}