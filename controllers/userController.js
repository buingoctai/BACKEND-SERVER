var submittedUserDataHandling = require('./pythonServerContrller');

exports.submitUserData = async (req, res, next) => {
  const { userName, fbUrl, techKnowledge, addKnowledge } = req.body;
  const isStringTech = (typeof techKnowledge) === 'string';
  const isStringAdd = (typeof addKnowledge) === 'string';



  // if
  if (isStringTech || isStringAdd) {
    await submittedUserDataHandling({ userName: "hihihihiiiiiiiiiii" })
      .then(resp => {
        console.log("resp=", resp);
      })
      .catch(err => {
        console.log("err=", err);
      });

  }




  // // Call python server
  // var request = require("superagent");
  // var python_url = "http://127.0.0.1:5000";
  // await request.post(python_url + "/userData_classification").send(req.body).set('Accept', 'application/json')
  //   .end((err, data) => {
  //     if (err) res.send(err);
  //     const response = JSON.parse(data.text);
  //     res.status(200).send({ predictiveTech: response, predictiveAdd: response });
  //   })
};
