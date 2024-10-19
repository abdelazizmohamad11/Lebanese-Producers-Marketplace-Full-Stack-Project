const db = require('../db.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const salt = 10;

const authController = require('../controllers/auth.js');

const getProfile = (req, res, next) => {
    //const id = req.params.id.split('=')[1];
    authController.verifyUser(req, res, () => {
        const email = req.email;
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], (err, data) => {
            if (err) return res.json({ Error: "error in server" })
            req.user = data[0];
            next();
        })
    })
}

const editProfile = (req, res, next) => {
    const newData = req.body;
    console.log(newData);
    getProfile(req, res, async () => {
        try {
            if (newData.role === 'producer') {
                const bussinessSql = `SELECT bussiness_category_id FROM bussiness_category WHERE bussiness_category_name = ?;`;
                try {
                    const response = await executeQuery(bussinessSql, [newData.bussiness_category.toLowerCase()]);
                    newData.bussiness_category = response[0].bussiness_category_id
                }
                catch (err) {
                    const insertBussinessCategory = `INSERT INTO bussiness_category (bussiness_category_name) VALUES (?);`;
                    try {
                        const val = [newData.bussiness_category.toLowerCase()]
                        await executeQuery(insertBussinessCategory, [val]);
                        try {
                            const getBussinessId = `SELECT LAST_INSERT_ID() AS inserted_id;`;
                            const bus_id = await executeQuery(getBussinessId, []);
                            newData.bussiness_category = bus_id[0].inserted_id
                        } catch (err) {
                            console.log(err)
                            return res.status(500).json({ Error: 'Error in server' });
                        }
                    }
                    catch (err) {
                        console.log(err)
                        return res.status(500).json({ Error: 'Error in server' });
                    }
                }
            }
            const oldData = req.user;
            const id = req.user.user_id;
            const hashedPassword = await bcrypt.hash(newData.password.toString(), salt);
            console.log(newData);
            if (newData.role !== oldData.role) {
                // User wants to change the role
                if (newData.role === 'producer') {
                    // User wants to become a producer
                    const insertProducerSql = `
                  INSERT INTO producers (user_id, bussiness_category, location, contact, description)
                  VALUES (?, ?, ?, ?, ?)
                `;
                    const values = [
                        id,
                        newData.bussiness_category,
                        newData.location,
                        newData.contact,
                        newData.description
                    ];

                    await executeQuery(insertProducerSql, values);

                } else {
                    // User wants to become a consumer
                    const deleteProducerSql = 'DELETE FROM producers WHERE user_id = ?';
                    await executeQuery(deleteProducerSql, [id]);
                }
            }
            else {
                //he doesn't want to change his role but if he's a producer we need to edit his data
                if (newData.role === 'producer') {
                    const values = [
                        newData.bussiness_category,
                        newData.location,
                        newData.contact,
                        newData.description,
                        id
                    ];
                    const editProducerSql = `UPDATE producers
                    SET
                      bussiness_category = ?,
                      location = ?,
                      contact = ?,
                      description = ?
                    WHERE user_id = ?`
                    await executeQuery(editProducerSql, values);
                }

            }

            const updateUserSql = `
              UPDATE users
              SET
                name = ?,
                email = ?,
                password = ?,
                role = ?,
                fullname = ?,
                image_url= ?
              WHERE user_id = ?
            `;
            const values2 = [
                newData.name,
                newData.email,
                hashedPassword,
                newData.role,
                newData.fullname,
                newData.image_url,
                id,
            ];

            await executeQuery(updateUserSql, values2);

            return res.json({ status: 'success' });
        } catch (error) {
            console.error('Error in editProfile:', error);
            return res.status(500).json({ Error: 'Error in server' });
        }
    })

};


const executeQuery = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};








module.exports.getProfile = getProfile;
module.exports.editProfile = editProfile;