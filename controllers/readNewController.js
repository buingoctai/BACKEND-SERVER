const sql = require("mssql");

const constants = require("../utils/constants");
const {
  FIND_ALL_ARTICLES_CRAWL,
  COUNT_TOTAL_ARTICLE_CRAWL,
  ERROR_CODE,
  INSER_ARTICLE_CRAWL

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

exports.getAudioArticle = async (req, res) => {
  const request = require("superagent");
  const { text, id } = req.body;
  const subContentList = text.split('.');
  const contentGroup = [];
  const audioGroup = [];

  let subContent = subContentList[0];
  if (subContent.length > 2) {
    for (let i = 1; i < subContentList.length; i++) {
      if ((tempory = subContent + subContentList[i]).length > 200) {
        contentGroup.push(subContent);
        subContent = "";
        i -= 1;
      }
      else {
        subContent += subContentList[i];
        if (i === subContentList.length - 1) {
          contentGroup.push(subContent);
        }
      }
      tempory = "";
    }

  } else {
    contentGroup.push(text);
  }

  console.log(text.length);

  console.log(contentGroup);

  const request_new = new sql.Request();
  request_new.query(
    INSER_ARTICLE_CRAWL
      .replace("ArticleIdValue", id)
      .replace("AudioUrlValue", 'audioGroup'),
    (err) => {
      if (err) {
        // res.status(500).send();
      }

    }
  );

  for (let i = 0; i < contentGroup.length; i++) {
    request
      .post("https://api.fpt.ai/hmi/tts/v5")
      .send(contentGroup[i])
      .set('api-key', 'CBLvzIiqo1Z59C91KxEy1svZZ7vxwT9V')
      .set('voice', 'banmai')
      .end((err, data) => {
        console.log('data', data.text);
        audioGroup.push(JSON.parse(data.text).async);
        if (i === contentGroup.length - 1) {
          // const request = new sql.Request();
          // request.query(
          //   INSER_ARTICLE_CRAWL
          //     .replace("ArticleIdValue", id)
          //     .replace("AudioUrlValue", audioGroup.toString()),
          //   (err) => {
          //     if (err) {
          //       res.status(500).send();
          //     }
          //     res.json({ id: id, audio: audioGroup });
          //   }
          // );
          res.json({ id: id, audio: audioGroup });
        }
      });
  }



}