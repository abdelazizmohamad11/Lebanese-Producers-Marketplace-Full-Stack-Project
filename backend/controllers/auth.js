const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db.js')

const salt = 10;

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not authenticated" })
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.json({ Error: "token is not okay!" })
            } else {
                req.email = decoded.email;
                next();
            }
        })
    }
}

const register = (req, res) => {
    if(!emailIsValid(req.body.email)||!passwordIsValid(req.body.password)||!nameIsValid(req.body.name)){
        return res.status(500).json({ Error: "Inputs Are Not Valid!" });
    }

    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [req.body.email], (err, checkEmailResult) => {
        if (err) {
            return res.status(500).json({ Error: "Error checking email existence" });
        }

        if (checkEmailResult.length > 0) {
            console.log(checkEmailResult)
            return res.json({ status: "fail", Error: "Email already in use" });
        } else {
            const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES (?)"
            bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
                if (err) {
                    console.log(err)
                    res.json(err);
                }
                const values = [
                    req.body.name,
                    req.body.email,
                    hash
                ]
                db.query(sql, [values], (err, result) => {
                    if (err) {
                        console.log(err)
                        res.json(err);
                    }
                    return res.json({ status: "success" });
                })
            })
        }
    })


}

const login = (req, res) => {
    if(!emailIsValid(req.body.email)||!passwordIsValid(req.body.password)){
        return res.status(500).json({ Error: "Inputs Are Not Valid!" });
    }
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Login error in server" })

        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error" });
                if (response) {
                    const email = data[0].email;
                    const token = jwt.sign({ email }, 'jwt-secret-key', { expiresIn: '1d' });
                    res.cookie('token', token)
                    return res.json({ status: "success", user: { name: data[0].name, email: req.body.email } });
                } else {
                    return res.json({ Error: "Password not matched" });
                }
            })
        } else {
            return res.json({ Error: "No email existed" })
        }
    })
}

const logout = (req, res) => {
    res.clearCookie('token')
    return res.json({ status: 'success' })
}


const emailIsValid=(value)=>{
    return value.includes("@") && value.includes(".com") && !value.includes("@.")
}
const passwordIsValid=(value)=>{
    return value.length >= 5;
}

const nameIsValid=(value)=>{
    return value.trim() !== "";
}
module.exports.verifyUser = verifyUser;
module.exports.register = register;
module.exports.login = login;
module.exports.logout = logout;
