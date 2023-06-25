const {pool} = require('../database');

//Funciones de gestión de usuarios
//Registro de nuevo usuario
async function registerUser (req, res){
    
    //recogemos los datos de usuario por el body
    const {name, last_name, email, photo, password} = req.body;
    const params = [name, last_name, email, photo, password];

    //insertamos el nuevo usuario en la tabla
    let sql = `INSERT INTO user (name, last_name, email, photo, password) VALUES (?,?,?,?,?);`;

    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        let answer = {error: false, code: 200, message: "Usuario registrado correctamente", result: result};
        res.send(answer);
    } 
    catch (error) {
    console.log(error); 
    }
}

//Login usuario registrado
async function loginUser (req, res){
    
    let answer = null;
    //recogemos los datos de usuario por el body (mail y password)
    const {email, password} = req.body;
    const params = [email, password];

    //buscamos el usuario en la tabla user
    let sql = `SELECT id_user, name, last_name, email, photo FROM user WHERE email = ? AND password = ?;`;

    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        res.send(result);
    } 
    catch (error) {
    console.log(error); 
    }
}

module.exports = {registerUser,loginUser};