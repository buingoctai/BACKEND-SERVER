const sql = require("mssql");
const uuidv4 = require("uuid/v4");

const constants = require("../utils/constants");
const { INSERT_ARTICLE, DATABASE_SERVER_CONFIG_DEV } = constants;

exports.submitArticle = async (req, res) => {
  const { author, title, content, topic, submitDate, imageUrl } = req.body;
  const id = uuidv4();
  sql.connect(DATABASE_SERVER_CONFIG_DEV, (err) => {
    if (err) res.status(500).send(err);
    const request = new sql.Request();
    request.query(
      INSERT_ARTICLE.replace("IdValue", id)
        .replace("AuthorValue", author)
        .replace("TitleValue", title)
        .replace("ContentValue", content)
        .replace("TopicValue", topic)
        .replace("SubmitDateValue", submitDate)
        .replace("ImageValue", imageUrl),
      (err) => {
        if (err) {
          res.status(500).send();
        }
      }
    );
  });
  res.status(200).send({ message: "Thành công" });
};
