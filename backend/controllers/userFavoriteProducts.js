const db = require('../db.js');
const authController = require('../controllers/auth.js');

const addToUserFavorites = (req, res) => {
    const { product_id } = req.body;
    authController.verifyUser(req, res, async () => {
        try {
            const email = req.email;
            const sql = 'SELECT user_id FROM users WHERE email = ?';
            const val = [email];
            const response = await executeQuery(sql, [val]);
            const user_id = response[0].user_id;
            const existingEntry = await executeQuery('SELECT * FROM favorites WHERE user_id = ? AND product_id = ?', [user_id, product_id]);
            if (existingEntry.length > 0) {
                return res.status(400).json({ success: false, Error: 'Product already in favorites.' });
            }

            const result = await executeQuery('INSERT INTO favorites (user_id, product_id) VALUES (?, ?)', [user_id, product_id]);

            res.status(200).json({ status: 'success', message: 'Product added to favorites.' });

        } catch (err) {
            console.error('Error adding to favorites:', err);
            res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
        }
    })
}

const getUserFavoriteProducts = (req, res) => {
    authController.verifyUser(req, res, async () => {
        try {
            const email = req.email;
            const sql = 'SELECT user_id FROM users WHERE email = ?';
            const val = [email];
            const response = await executeQuery(sql, [val]);
            const user_id = response[0].user_id;
            // Get favorite products based on user_id
            const result = await executeQuery('SELECT product_id FROM favorites WHERE user_id = ?', [user_id]);

            // Extract product_ids from the result
            const favoriteProductIds = result.map(entry => entry.product_id);

            res.status(200).json({ status: 'success', favoriteProductIds });

        } catch (err) {
            console.error('Error fetching favorites:', err);
            res.status(500).json({ status: 'fail', Error: 'Internal Server Error' });
        }
    })
}

const deleteFromUserFavorites = (req, res) => {
    const { product_id } = req.body;
    authController.verifyUser(req, res, async () => {
        try {
            const email = req.email;
            const sql = 'SELECT user_id FROM users WHERE email = ?';
            const val = [email];
            const response = await executeQuery(sql, [val]);
            const user_id = response[0].user_id;
            const existingEntry = await executeQuery('SELECT * FROM favorites WHERE user_id = ? AND product_id = ?', [user_id, product_id]);
            if (existingEntry.length === 0) {
                return res.status(400).json({ success: false, Error: 'Product is not in favorites.' });
            }

            const deleteFavoriteQuery = `DELETE FROM favorites WHERE user_id = ? AND product_id = ?`;
            const deleteFavoriteValues = [user_id, product_id];
            await executeQuery(deleteFavoriteQuery, deleteFavoriteValues);

            res.status(200).json({ status: 'success', message: 'Product removed from favorites.' });

        } catch (err) {
            console.error('Error adding to favorites:', err);
            res.status(500).json({ status: 'fail', Error: 'Internal Server Error' });
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

module.exports.addToUserFavorites = addToUserFavorites
module.exports.getUserFavoriteProducts = getUserFavoriteProducts
module.exports.deleteFromUserFavorites = deleteFromUserFavorites