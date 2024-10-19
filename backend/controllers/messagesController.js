const db = require('../db.js');
const authController = require('./auth.js')
exports.getProducerMessages = async (req, res) => {
    try {
        const { producer_id } = req.params;
        const sql = `CALL GetProducerMessages(?)`;
        const val = [producer_id];
        const response = await executeQuery(sql, [val]);
        return res.json({ status: "success", messages: response[0] });
    } catch (err) {
        return res.status(500).json({ Error: 'Internal Server Error' });
    }
}
exports.addMessage = (req, res) => {
    const { message } = req.body;
    const { producer_id } = req.params;
    authController.verifyUser(req, res, async () => {
        try {
            const email = req.email;
            const sql = `CALL AddMessage(?,?,?)`;
            const values = [
                email,
                producer_id,
                message
            ];
            await executeQuery(sql, values);
            return res.json({ status: "success", message: "Message Posted Succesfully" });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ Error: 'Internal Server Error' });
        }
    })
}

 exports.deleteMessage = (req, res) => {
    const {message_id} = req.params;
    authController.verifyUser(req, res, async () => {
        try {
            const email = req.email;
            const sql = `DELETE m
        FROM messages AS m
        JOIN users AS u ON m.sender_id = u.user_id OR m.receiver_id = u.user_id
        WHERE m.message_id = ?
        AND u.email = ?;`
            const values = [
                message_id,
                email
            ]
            const r = await executeQuery(sql, values);
            return res.json({ status: "success", message: "Message Deleted Succesfully" });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ Error: 'Internal Server Error' });
        }

    })
}

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


