const submittedUserDataHandling = async (req) => {
    var request = require("superagent");
    var python_url = "http://127.0.0.1:5000";
    await request.post(python_url + "/userData_classification").send(req).set('Accept', 'application/json')
        .end((err, data) => {
            if (err) return err;
            const response = JSON.parse(data.text);
            return ({ predictiveTech: response, predictiveAdd: response });
        })
}

module.exports = submittedUserDataHandling;