const submittedUserDataHandling = async (req) => {
    var request = require("superagent");
    var python_url = "http://127.0.0.1:5000";
    request.post(python_url + "/userData_classification").send(req).set('Accept', 'application/json')
        .end((err, data) => {
            console.log("in pythonServerController err,data", err, data.res.text)
            if (err) return err;
            const response = JSON.parse(data.res.text);
            return ({ predictiveTech: response, predictiveAdd: response });
        })
}

module.exports = submittedUserDataHandling;