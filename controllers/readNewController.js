const sql = require("mssql");

const constants = require("../utils/constants");
const {
  FIND_ALL_ARTICLES_CRAWL,
  COUNT_TOTAL_ARTICLE_CRAWL,
  ERROR_CODE,
} = constants;

exports.getAllArticle = async (req, res) => {
  let repsonse = {};
  repsonse["data"] = [];
  repsonse["totalRecord"] = 0;
  const {
    paging: { pageIndex, pageSize },
    orderList: { orderType, orderBy },
  } = req.body;

  const callSearching = new Promise((resolve, reject) => {
    const request = new sql.Request();

    request.query(COUNT_TOTAL_ARTICLE_CRAWL, (err, data) => {
      if (err) reject({ err: ERROR_CODE["500"], statusCode: 500 });
      const {
        recordset: [item],
      } = data;

      console.log(
        FIND_ALL_ARTICLES_CRAWL.replace("orderByValue", orderBy)
          .replace("orderTypeValue", orderType)
          .replace("startValue", pageSize * (pageIndex - 1))
          .replace("pageSizeValue", pageSize)
      );
      request.query(
        FIND_ALL_ARTICLES_CRAWL.replace("orderByValue", orderBy)
          .replace("orderTypeValue", orderType)
          .replace("startValue", pageSize * (pageIndex - 1))
          .replace("pageSizeValue", pageSize),
        (err, data) => {
          if (err) reject({ err: ERROR_CODE["500"], statusCode: 500 });
          const { recordset } = data;
          resolve({ data: recordset, totalRecord: item[""] });
        }
      );
    });
  });
  callSearching
    .then((response) => res.json(response))
    .catch(({ err, statusCode }) => {
      res.statusCode = statusCode;
      res.json(err);
    });
};

exports.getDetailPost = async (req, res) => {
  const { id } = req.body;
  const request = new sql.Request();

  request.query(FIND_DETAIL_POST.replace("IdValue", id), (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json(500);
    }
    const {
      recordset: [postData],
    } = data;
    res.json(postData);
  });
};

exports.getAllTopic = async (req, res) => {
  let response = [];
  const request = new sql.Request();

  request.query(FIND_ALL_TOPIC, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json(500);
    }
    const { recordset } = data;
    recordset.map((item) => {
      response.push(item.Topic);
    });

    res.json(response.filter((a, b) => response.indexOf(a) === b));
  });
};
