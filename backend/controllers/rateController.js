const db = require('../db.js');
const authController = require('../controllers/auth.js');

const submitRate=(req,res)=>{
    const { product_id, product_review } = req.body;
    authController.verifyUser(req,res,async()=>{
        try{
        if (product_review < 0 || product_review > 5) {
            return res.status(400).json({ Error: 'Invalid product review value' });
        }
        const email=req.email
        const sql = 'SELECT * FROM users WHERE email = ?';
        const val=[email]
        const insertReviewQuery = 'INSERT INTO product_reviews (product_id, product_review) VALUES ( ?, ?)';
        await executeQuery(insertReviewQuery, [product_id, product_review]);
        res.json({ status: 'success', message: 'Review submitted successfully' });
    }catch(err){
        console.log(err);
        return res.status(500).json({Error:"error in server"})
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
module.exports.submitRate=submitRate;