exports.submitUserData = async (req, res, next) => {
  var request = require("superagent");
  const { userName, fbUrl, techKnowledge, addKnowledge } = req.body;
  const isStringTech = typeof techKnowledge === "string";
  const isStringAdd = typeof addKnowledge === "string";
  const python_url = "http://127.0.0.1:5000";

  if (isStringTech && isStringAdd) {
    request
      .post(python_url + "/userData_classification")
      .send({ list: [{ data: techKnowledge, fileName: "predictiveTech" }, { data: addKnowledge, fileName: "predictiveAdd" }] })
      .set("Accept", "application/json")
      .end((err, data) => {
        if (err) res.send(err);
        response = JSON.parse(data.text);

        // Fake handle response
        // some code
        //---------------
        const fakeConfidentTech = 0.81;
        const fakeConfidentAdd = 0.5;
        let techHandler = {};
        let addHandler = {};

        if (fakeConfidentTech > 0.7) {
          techHandler = {
            classified: true,
            labels: ["Mobile"]
          };
          // Insert into database: labels
        } else {
          // Query into database: labels
          techHandler = {
            classified: false,
            labels: ["Front-End", "Back-End", "Mobile"]
          };
        }
        if (fakeConfidentAdd > 0.7) {
          addHandler = {
            classified: true,
            labels: ["Marketing"]
          };
          // Insert into database: labels
        } else {
          // Query into database: labels
          addHandler = {
            classified: false,
            labels: ["Marketing", "Leader", "Sales"]
          };
        }
        res.status(200).send({ techHandler, addHandler });
      });
  } else {
    // Insert to database: labels
    // Query into database: labels
    const responseChoosing = {
      techHandler: {
        classified: true,
        labels: ["Front-End"]
      },
      addHandler: {
        classified: true,
        labels: ["Marketing"]
      }
    };
    res.status(200).send({ ...responseChoosing });
  }

};
