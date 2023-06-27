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

    //Modificar perfil de usuario
    async function editUser (req, res){
    
        //recogemos los datos de usuario por el body (mail y password)
        const {id_user, name, last_name, email, photo, password} = req.body;
        const params = [
            name? name: null,
            last_name? last_name: null,
            email? email: null,
            photo? photo: null,
            password? password: null,
            id_user? id_user: null,
        ];
    

        //buscamos el usuario en la tabla user y modificamos los datos
        let sql = `UPDATE user SET name = COALESCE(?,name), last_name = COALESCE(?,last_name), email = COALESCE(?,email), photo = COALESCE(?,photo), password = COALESCE(?,password) WHERE id_user = ?`;

        try {
            //peticion sql a la BBDD
            const [result] = await pool.query(sql, params);
            res.send(result);
        } 
        catch (error) {
        console.log(error); 
        }
    }


module.exports = {registerUser,loginUser,editUser};