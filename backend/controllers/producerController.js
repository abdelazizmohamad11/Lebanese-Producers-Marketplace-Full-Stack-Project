const db = require('../db.js')
const authController = require('../controllers/auth.js');
// Function to get all producers
exports.getAllProducers = (req, res) => {
  const query = `
    SELECT
      u.name AS producer_name,
      u.image_url AS producer_image,
      u.fullname AS fullname,
      p.producer_id AS producer_id,
      p.bussiness_category AS producer_bussiness,
      p.description AS description, 
      p.location As location,
      p.rating
    FROM
      producers p
    JOIN
      users u ON p.user_id = u.user_id
    ORDER BY
      p.rating DESC
      ;
  `;

  db.query(query, async (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ Error: 'Internal Server Error' });
    }

    const getCategoryName = `SELECT bussiness_category_name FROM bussiness_category where bussiness_category_id = ?`;

    // Use Promise.all to wait for all promises to resolve
    await Promise.all(
      results.map(async (result, index) => {
        const val = [results[index].producer_bussiness];
        const r = await executeQuery(getCategoryName, [val]);
        results[index].producer_bussiness = r[0].bussiness_category_name;
      })
    );
    res.json(results);
  });
};

exports.getUniqueLocations = async (req, res) => {
  try {
    const query = 'SELECT DISTINCT location FROM producers';
    const results = await executeQuery(query, []);
    const locations = results.map(result => result.location);
    res.json({ status: 'success', locations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: 'Internal Server Error' });
  }
}


exports.getBussinessCategories = async (req, res) => {
  try {
    const query = 'SELECT bussiness_category_name  FROM bussiness_category';
    const results = await executeQuery(query, []);
    const bussinessCategories = results.map(result => result.bussiness_category_name);
    res.json({ status: 'success', bussinessCategories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: 'Internal Server Error' });
  }
}

exports.getProducerInfo = (req, res) => {
  authController.verifyUser(req,res, async () => {
    try {
      const email = req.email;
      const val = [email];
      const sql = `SELECT
      p.bussiness_category,
      p.location,
      p.contact,
      p.description,
      u.email
      FROM
      producers AS p
      JOIN
      users AS u ON p.user_id = u.user_id
      WHERE
      u.email = ? ;`
      const response = await executeQuery(sql,[val]);
      const getCategoryName = `SELECT bussiness_category_name FROM bussiness_category where bussiness_category_id = ?`;
      const valcat=[response[0].bussiness_category]
      const r=await executeQuery(getCategoryName,[valcat]);
      response[0].bussiness_category=r[0].bussiness_category_name;
      res.json({ status: 'success', producer_info:response[0] });
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


