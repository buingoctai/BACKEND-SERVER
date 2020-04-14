const sql = require("mssql");

const constants = require("../utils/constants");
const {
  FIND_MAIN_ARTICLE,
  FIND_FEATURED_ARTICLE,
  DATABASE_SERVER_CONFIG,
} = constants;

exports.getMainPosts = async (req, res) => {
  sql.connect(DATABASE_SERVER_CONFIG, (err) => {
    if (err) res.status(500).send({});
    const request = new sql.Request();
    request.query(FIND_MAIN_ARTICLE, (err, data) => {
      if (err) res.status(500).send();
      const {
        recordset: [postData],
      } = data;
      res.json(postData);
    });
  });
};

exports.getFeaturedPosts = async (req, res) => {
  let repsonse = {};
  repsonse["data"] = [];
  let index = 0;
  const { featuredLabels } = req.body;

  const temporyFunc = new Promise((resolve, reject) => {
    featuredLabels.forEach((item) => {
      sql.connect(DATABASE_SERVER_CONFIG, (err) => {
        if (err) res.status(500).send({});
        const request = new sql.Request();
        request.query(
          FIND_FEATURED_ARTICLE.replace("LabelValue", item),
          (err, data) => {
            if (err) reject(err);
            console.log("data=", data);
            const {
              recordset: [postData],
            } = data;

            repsonse["data"].push(postData);
            index++;
            if (index === featuredLabels.length) {
              resolve(repsonse);
            }
          }
        );
      });
    });
  });
  temporyFunc.then((data) => res.json(data)).catch((err) => res.json(err));
};
