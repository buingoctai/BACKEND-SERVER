exports.submitUserData = async (req, res, next) => {
  var request = require("superagent");
  const { userName, fbUrl, techKnowledge, addKnowledge } = req.body;
  const isStringTech = typeof techKnowledge === "string";
  const isStringAdd = typeof addKnowledge === "string";
  const python_url = "http://127.0.0.1:5000";

  let response_Tech = {};
  let response_Add = {};
  if (isStringTech) {
    request
      .post(python_url + "/userData_classification")
      .send({ userData: techKnowledge })
      .set("Accept", "application/json")
      .end((err, data) => {
        if (err) res.send(err);
        response_Tech = JSON.parse(data.text);
      });
  } else {
    // Saving to database
  }

  if (isStringAdd) {
    request
      .post(python_url + "/userData_classification")
      .send({ userData: addKnowledge })
      .set("Accept", "application/json")
      .end((err, data) => {
        if (err) res.send(err);
        response_Add = JSON.parse(data.text);
      });
  } else {
    // Saving to database
  }

  res
    .status(200)
    .send({ predictiveTech: response_Add, predictiveAdd: response_Add });
};
