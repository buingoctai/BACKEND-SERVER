exports.submitUserData = async (req, res, next) => {
  console.log("userData=", req.body);

  var request = require("superagent");
  var python_url = "http://127.0.0.1:5000";
  request.get(python_url + "/userData_classification").end((err, data) => {
    if (err) res.send(err);
    const response = JSON.parse(data.text);
    res.status(200).send(response);
  });
};
