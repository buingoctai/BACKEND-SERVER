const sql = require("mssql");

const constants = require("../utils/constants");
const {
  FIND_MAIN_ARTICLE,
  FIND_FEATURED_ARTICLE,
  FIND_ARTICLE_AS_PAGE,
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

exports.getAllPost = async (req, res) => {
  const {
    paging: { pageIndex, pageSize },
    orderList: { orderType, orderBy },
  } = req.body;

  sql.connect(FIND_ARTICLE_AS_PAGE, (err) => {
    if (err) res.status(500).send({});
    const request = new sql.Request();
    request.query(
      FIND_ARTICLE_AS_PAGE.replace("orderByValue", orderBy)
        .replace("orderTypeValue", orderType)
        .replace("startValue", pageSize * (pageIndex - 1))
        .replace("pageSizeValue", pageSize),
      (err, data) => {
        if (err) res.status(500).send();
        const { recordset } = data;
        res.json(recordset);
      }
    );
  });
};
