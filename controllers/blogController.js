const sql = require("mssql");
const { Connection, Request } = require("tedious");

const constants = require("../utils/constants");
const {
  FIND_MAIN_ARTICLE,
  FIND_FEATURED_ARTICLE,
  FIND_ARTICLE_AS_PAGE,
  COUNT_TOTAL_ARTICLE,
  DATABASE_SERVER_CONFIG_DEV,
  DATABASE_SERVER_CONFIG_DEV_PRO,
} = constants;

exports.getMainPosts = async (req, res) => {
  sql.connect(DATABASE_SERVER_CONFIG_DEV_PRO, (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
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
      sql.connect(DATABASE_SERVER_CONFIG_DEV, (err) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
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
  let repsonse = {};
  repsonse["data"] = [];
  repsonse["totalRecord"] = 0;
  const {
    paging: { pageIndex, pageSize },
    orderList: { orderType, orderBy },
  } = req.body;

  const callSearching = new Promise((resolve, reject) => {
    sql.connect(DATABASE_SERVER_CONFIG_DEV, (err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      const request = new sql.Request();
      request.query(COUNT_TOTAL_ARTICLE, (err, data) => {
        if (err) reject(err);
        const {
          recordset: [item],
        } = data;

        request.query(
          FIND_ARTICLE_AS_PAGE.replace("orderByValue", orderBy)
            .replace("orderTypeValue", orderType)
            .replace("startValue", pageSize * (pageIndex - 1))
            .replace("pageSizeValue", pageSize),
          (err, data) => {
            if (err) reject(err);
            const { recordset } = data;
            resolve({ data: recordset, totalRecord: item[""] });
          }
        );
      });
    });
  });
  callSearching
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};
