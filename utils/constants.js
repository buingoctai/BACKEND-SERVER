const PYTHON_SERVER_URL = "http://127.0.0.1:5000";
const INSERT_QUERY =
  "INSERT INTO Users (Id,UserName, FbUrl, TechTxt,AddTxt) VALUES ('IdValue','UserNameValue', 'FbUrlValue', 'TechTxtValue', 'AddTxtValue')";
const GET_ID_QUERY = "SELECT Id FROM Users WHERE Id='IdValue'";
module.exports = {
  PYTHON_SERVER_URL: PYTHON_SERVER_URL,
  INSERT_QUERY: INSERT_QUERY,
  GET_ID_QUERY: GET_ID_QUERY
};
