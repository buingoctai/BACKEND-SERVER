const sql = require("mssql");

const constants = require("../utils/constants");
const { ARTICLE_FIND, DATABASE_SERVER_CONFIG } = constants;

exports.getMainPosts = async (req, res) => {
  sql.connect(DATABASE_SERVER_CONFIG, (err) => {
    if (err) res.status(500).send({});
    const request = new sql.Request();
    request.query(ARTICLE_FIND, (err, data) => {
      if (err) res.status(500).send();
      const {
        recordset: [userData],
      } = data;
      res.json(userData);
    });
  });
};
