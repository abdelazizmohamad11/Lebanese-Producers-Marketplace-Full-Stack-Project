const db = require('../db.js')

const authController = require('../controllers/auth.js');
const { get } = require('../routes/auth.js');

exports.getAllProducts = (req, res) => {
    const query = `
    SELECT
    ROW_NUMBER() OVER (ORDER BY p.rating DESC) AS product_rank,
    p.name,
    p.product_id AS product_id,
    pr.producer_id AS producer_id,
    p.quantity AS quantity,
    p.rating AS product_rating,
    p.price AS price,
    p.image_url As image,
    p.origin As origin,
    p.category_id As category,
    p.description As description,
    u.image_url As producer_image,
    u.name AS producer_name,
    u.user_id AS user_id
    FROM
    products p
    JOIN
    producers pr ON p.producer_id = pr.producer_id
    JOIN
    users u ON pr.user_id = u.user_id
    ORDER BY
    p.rating DESC;
  `;

    db.query(query, async (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ Error: 'Internal Server Error' });
        }
        const getCategoryName = `SELECT category_name FROM categories where category_id = ?`;

        // Use Promise.all to wait for all promises to resolve
        await Promise.all(
            results.map(async (result, index) => {
                const val = [results[index].category];
                try {
                    const r = await executeQuery(getCategoryName, [val]);
                    results[index].category = r[0].category_name;
                } catch (err) {
                    return res.status(500).json({ Error: 'Internal Server Error' });
                }
            })
        );
        return res.json(results);
    });
};


exports.checkOwnership = (req, res, next) => {
    const { productId } = req.params;
    authController.verifyUser(req, res, async () => {
        try {
            const userEmail = req.email;
            const query = `CALL IsUserProductOwner(?, ?)`;
            const val = [userEmail, productId];
            const response = await executeQuery(query, val)

            const isOwner = response[0][0].isOwner;
            req.isOwner = isOwner;
            next();

        } catch (error) {
            console.error('Error checking ownership:', error);
            res.status(500).json({ Error: 'Internal Server Error' });
        }
    })
};

exports.deleteProduct = (req, res) => {
    const { productId } = req.params
    this.checkOwnership(req, res, async () => {
        try {
            const isOwner = req.isOwner;
            if (isOwner === 1) {
                const query = 'DELETE FROM products WHERE product_id = ?';
                const val = [productId];
                const res = await executeQuery(query, productId);
                res.status(200).json({ status: 'success', message: 'product deleted successfully' })
            } else {
                res.status(403).json({ Error: 'you are not authorized to delete this product' })
            }

        } catch (err) {
            res.status(500).json({ Error: 'Internal Server Error' });
        }
    })
}

exports.getUniqueOrigins = async (req, res) => {
    try {
        const query = 'SELECT DISTINCT origin FROM products';
        const results = await executeQuery(query, []);
        const origins = results.map(result => result.origin);
        res.json({ status: 'success', origins });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: 'Internal Server Error' });
    }
}

exports.getProductsCategories = async (req, res) => {
    try {
        const query = 'SELECT category_name  FROM categories';
        const results = await executeQuery(query, []);
        const productsCategories = results.map(result => result.category_name);
        res.json({ status: 'success', productsCategories });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: 'Internal Server Error' });
    }
}

exports.addProduct = (req, res) => {
    const product = req.body;
    if (!productIsValid(product)) {
        return res.status(500).json({ Error: 'Product Is Not Valid' });
    }
    authController.verifyUser(req, res, async () => {
        try {
            const email = req.email;
            const sql = 'SELECT * FROM users WHERE email = ?';
            const v = [email];
            const results = await executeQuery(sql, [v])
            const user_data = results[0];
            if (user_data.role !== 'producer') {
                res.status(403).json({ Error: "You Are Not Allowed To Add a Product" });
            }
            const getProducerId = `select producer_id from producers where user_id = ?`;
            const val1 = [user_data.user_id];
            const r = await executeQuery(getProducerId, [val1]);
            const producer_id = r[0].producer_id
            const categorySql = `SELECT category_id FROM categories WHERE category_name = ?;`;
            try {
                const response = await executeQuery(categorySql, [product.category.toLowerCase()]);
                product.category = response[0].category_id
            }
            catch (err) {
                const insertCategory = `INSERT INTO categories (category_name) VALUES (?);`;
                try {
                    const val = [product.category.toLowerCase()]
                    await executeQuery(insertCategory, [val]);
                    try {
                        const getCategoryId = `SELECT LAST_INSERT_ID() AS inserted_id;`;
                        const cat_id = await executeQuery(getCategoryId, []);
                        product.category = cat_id[0].inserted_id
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

            const insertProduct = `INSERT INTO products (producer_id,name,description,price, quantity,category_id, origin) VALUES (?, ?, ?, ?, ?, ?, ?)`
            const values = [producer_id, product.name, product.description, product.price, product.quantity, product.category, product.origin];
            const response = await executeQuery(insertProduct, values);
            console.log(response);
            res.json({ status: 'success', message: 'Product added successfully' });

        } catch (err) {
            console.log(err)
            return res.status(500).json({ Error: 'Internal Server Error' });
        }
    })
}

exports.editProduct = (req, res) => {
    const product = req.body;
    if (!productIsValid(product)) {
        return res.status(500).json({ Error: 'Product Is Not Valid' });
    }
    const { productId } = req.params;
    this.checkOwnership(req, res, async () => {
        try {
            const isOwner = req.isOwner;
            if (isOwner === 1) {
                const categorySql = `SELECT category_id FROM categories WHERE category_name = ?;`;
                try {
                    const response = await executeQuery(categorySql, [product.category.toLowerCase()]);
                    product.category = response[0].category_id
                }
                catch (err) {
                    const insertCategory = `INSERT INTO categories (category_name) VALUES (?);`;
                    try {
                        const val = [product.category.toLowerCase()]
                        await executeQuery(insertCategory, [val]);
                        try {
                            const getCategoryId = `SELECT LAST_INSERT_ID() AS inserted_id;`;
                            const cat_id = await executeQuery(getCategoryId, []);
                            product.category = cat_id[0].inserted_id
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
                const values = [product.name, product.description, product.price, product.quantity, product.category, product.image_url, product.origin, productId];
                const updateProductSql = `UPDATE products
                SET name = ?, description = ?, price = ?, quantity = ?, category_id = ?, image_url = ?,origin = ?
                WHERE product_id = ? `;
                const r = await executeQuery(updateProductSql, values);
                return res.json({ status: "success", message: "Your Product edited succesfully" })
            }

            else {
                return res.status(403).json({ Error: "You Are Not Allowed To Delete This Product" });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ Error: "internal server error" });
        }
    })
}

const productIsValid = (product) => {
    return product.name.trim() !== "" && product.description.trim() !== "" && !isNaN(product.price) && product.quantity.trim() !== ""
        && product.category.trim() !== "" && product.origin.trim() !== "";
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




