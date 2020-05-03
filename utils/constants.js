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
const DELETE_ARTICLES = "DELETE FROM Articles WHERE Id IN (LIST_ID)";
const UPDATE_ARTICLES =
  "UPDATE Articles SET Author=N'AuthorValue',Title=N'TitleValue',Content=N'ContentValue',Topic='TopicValue',SubmitDate='SubmitDateValue',ImageUrl='ImageUrlValue'  WHERE Id=IdValue";

const DATABASE_SERVER_CONFIG_DEV = {
  user: "taibn1",
  password: "LTD1996@",
  database: "homnaydocgi dev",
  port: 1433,
  server: "homnaydocgi.database.windows.net",
};
const DATABASE_SERVER_CONFIG_PRO = {
  user: "taibn1",
  password: "LTD1996@",
  database: "homnaydocgi pro",
  port: 1433,
  server: "homnaydocgi.database.windows.net",
};

const FACEBOOK_DEV = {
  VALIDATION_TOKEN: "TokenTuyChon",
  PAGE_ACCESS_TOKEN:
    "EAAVvoN2edJABAJEqQ585UC7FDga1Ku02jazR2ZBvcY3TPnmTQYG88jSp4XD2PABoaOO2znzfoZACCpq06YMJJ7CKT7rLQE79Khhkbww6tw8x6nig6TfZB9I59CU2YSpgwxzvYsiOlNbeTcZBUGvfMBZBXOMUWYJ808POUfYBUhwZDZD",
  ADMIN_MESSENGER_ID: "3119991678020925",
};

const ERROR_CODE = {
  200: "Success.",
  201: "Success.",
  202: "Success.",
  204: "Delete Sucess.",
  400: "Request Error.",
  401: "UnAuthorized。",
  403: "Access Forbidden",
  404: "Not Found.",
  406: "Format unavaiable.",
  410: "Resource not exist.",
  422: "Validation error.",
  500: "Server error.",
  502: "Gateway error.",
  503: "Service unavaiable.",
  504: "Timeout.",
};

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
  DELETE_ARTICLES,
  UPDATE_ARTICLES,
  DATABASE_SERVER_CONFIG_DEV,
  DATABASE_SERVER_CONFIG_PRO,
  FACEBOOK_DEV,
  ERROR_CODE,
};
