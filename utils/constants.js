const PYTHON_SERVER_URL = "http://127.0.0.1:5000";
const INSERT_USER_DATA =
  "INSERT INTO Users (Id,UserName, FbUrl, TechTxt,AddTxt) VALUES ('IdValue','UserNameValue', 'FbUrlValue', 'TechTxtValue', 'AddTxtValue')";
const USER_FIND = "SELECT * FROM Users WHERE Id='IdValue'";
const INSERT_ARTICLE =
  "INSERT INTO Articles (Id, Author, Title, Content, Topic,SubmitDate, ImageUrl) VALUES ('IdValue',N'AuthorValue',N'TitleValue',N'ContentValue','TopicValue','SubmitDateValue','ImageValue')";
const FIND_MAIN_ARTICLE = "SELECT * FROM Articles ORDER BY SubmitDate DESC";
const FIND_FEATURED_ARTICLE =
  "SELECT TOP 1 * FROM Articles WHERE Articles.Topic='LabelValue' ORDER BY SubmitDate DESC";
const FIND_ARTICLE_AS_PAGE =
  "SELECT * FROM Articles ORDER BY orderByValue orderTypeValue OFFSET startValue ROWS FETCH NEXT pageSizeValue ROWS ONLY";
const COUNT_TOTAL_ARTICLE = "SELECT COUNT(*) FROM Articles";
const INSERT_PERSONALIZED_INFORMS =
  "INSERT INTO PersonalizedInforms (UserId,TechList,AddList) VALUES ('UserIdValue','TechListValue','AddListValue')";
const COUNT_USERNAME_OR_FBURL =
  "SELECT COUNT(*) AS TOTAL FROM Users WHERE Users.UserName='UserNameValue' OR Users.FbUrl='FbUrlValue'";
const DATABASE_SERVER_CONFIG_DEV = {
  user: "taibn1",
  password: "LTD1996@",
  database: "The Content Collection App",
  port: 1433,
  server: "127.0.0.1",
};
const DATABASE_SERVER_CONFIG_DEV_PRO = {
  user: "taibn1",
  password: "CNY1996@",
  database: "The Content Collection",
  port: 1433,
  server: "contentcollection.database.windows.net",
};
const PAGE_ACCESS_TOKEN =
  "EAAVvoN2edJABAJEqQ585UC7FDga1Ku02jazR2ZBvcY3TPnmTQYG88jSp4XD2PABoaOO2znzfoZACCpq06YMJJ7CKT7rLQE79Khhkbww6tw8x6nig6TfZB9I59CU2YSpgwxzvYsiOlNbeTcZBUGvfMBZBXOMUWYJ808POUfYBUhwZDZD";
const VALIDATION_TOKEN = "TokenTuyChon";

module.exports = {
  PYTHON_SERVER_URL,
  INSERT_USER_DATA,
  USER_FIND,
  INSERT_ARTICLE,
  FIND_MAIN_ARTICLE,
  FIND_FEATURED_ARTICLE,
  INSERT_PERSONALIZED_INFORMS,
  COUNT_USERNAME_OR_FBURL,
  COUNT_TOTAL_ARTICLE,
  FIND_ARTICLE_AS_PAGE,
  DATABASE_SERVER_CONFIG_DEV,
  DATABASE_SERVER_CONFIG_DEV_PRO,
  PAGE_ACCESS_TOKEN,
  VALIDATION_TOKEN,
};
