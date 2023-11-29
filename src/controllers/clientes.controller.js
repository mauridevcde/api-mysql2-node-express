import { pool } from "../db.js";

export const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clientes");
    console.log(rows);
    res.json(rows); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const getClientesById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM clientes WHERE idCliente = ?",
      [id]
    );
    console.log(rows);

    if (rows.length <= 0) {
      return res.status(404).json({ msg: "No existe el cliente" });
    }
    res.json(rows[0]); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const postClientes = async (req, res) => {
  const { nombre, edad } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO clientes (nombre, edad) VALUES (?, ?)",
      [nombre, edad]
    );
    res.send({
      id: rows.insertId,
      nombre,
      edad,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const putClientes = async (req, res) => {
  const { id } = req.params;
  const { nombre, edad } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE clientes SET nombre = IFNULL(?, nombre) , edad = IFNULL(?, edad) WHERE idCliente = ?",
      [nombre, edad, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ msg: "No existe el cliente" });
    }
    // ahora si existe el cliente y se actualizo correctamente llamamos a la base de datos para que nos devuelva el cliente actualizado
    const [rows] = await pool.query(
      "SELECT * FROM clientes WHERE idCliente = ?",
      [id]
    );
    console.log(rows);
    res.json(rows[0]); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const deleteCLientes = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "DELETE FROM clientes WHERE idCliente = ?",
      [id]
    );
    console.log(rows);
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ msg: "No existe el cliente" });
    }
    res.send.status(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};
