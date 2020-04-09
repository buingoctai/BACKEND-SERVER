const PYTHON_SERVER_URL = "http://127.0.0.1:5000";
const INSERT_USER_DATA =
  "INSERT INTO Users (Id,UserName, FbUrl, TechTxt,AddTxt) VALUES ('IdValue','UserNameValue', 'FbUrlValue', 'TechTxtValue', 'AddTxtValue')";
const USER_FIND = "SELECT * FROM Users WHERE Id='IdValue'";
const INSERT_ARTICLE =
  "INSERT INTO Articles (Id, Author, Title, Content, Topic,SubmitDate, ImageUrl) VALUES ('IdValue',N'AuthorValue',N'TitleValue',N'ContentValue','TopicValue','SubmitDateValue','ImageValue')";
const ARTICLE_FIND = "SELECT * FROM Articles ORDER BY SubmitDate DESC";
const DATABASE_SERVER_CONFIG = {
  user: "taibn1",
  password: "LTD1996@",
  database: "The Content Collection App",
  port: 1433,
  server: "35.240.162.28",
};
module.exports = {
  PYTHON_SERVER_URL,
  INSERT_USER_DATA,
  USER_FIND,
  INSERT_ARTICLE,
  ARTICLE_FIND,
  DATABASE_SERVER_CONFIG,
};
