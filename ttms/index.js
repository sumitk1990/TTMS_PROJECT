const express = require("express");
const dbConn = require("./config/data");
const bodyparser = require("body-parser")
const app = express();

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
app.use(bodyparser.json())
app.use(express.json());
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Temporary Registration of Vehicle",
      description:"To Register vehicles that are under a custodian of dealer, importer, manufacturer or assemblerbefore transferred to its user.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  "security": [
    {
      "implicit": [
        "read",
        "write"
      ]
    }
  ],  

  "securitySchemes": {
    "implicit": {
      "type": "oauth2",
      "flows": {
        "implicit": {
          "authorizationUrl": "http://example.com/oauth/auth",
          "scopes": {
            "write": "allows modifying resources",
            "read": "allows reading resources"
          }
        }
      }
    }
  },
  apis: ["./index.js"],
};
const swaggerspec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerspec));
//...................&&&&&&&&&&&&........................//
/**
 * @swagger
 * components:
 *   schemas:
 *     registration:
 *       type: object
 *       properties:
 *         VIN:
 *           type: string
 *         chasis:
 *           type: string
 *         date_time :
 *           type: string
 *         userId :
 *           type: number
 *         deviceId :
 *           type: string
 *         deviceLocation :
 *           type: string
 *         transaction_nbr :
 *           type: string
 *         transaction_name :
 *           type: string
 *         statu :
 *           type: string
 *         approved:
 *           type: string
 */
/**
  * @swagger
  * tags:
  *   name: Registration
  */
/**
 * @swagger
 * /api/v1.0/VR/registration/temporaryRegistration:
 *   get:
 *     tags: [Registration]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/registration'
 */
app.get("/api/v1.0/VR/registration/temporaryRegistration", function (req, res, next) {
  console.log("temporaryRegistration");
  var query = dbConn.query("SELECT * FROM registration ", function (err, rows) {
    console.log("err", err, "\n rows", rows);
    if (err) {
      console.log(err);
      return next("Mysql error, check your query");
    }
    res.send(rows);
  });
});

/**
 * @swagger
 * /api/v1.0/VR/registration/temporaryRegistration/{id}:
 *   get:
 *     tags: [Registration]
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *              type: integer
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/registration'
 */
app.get("/api/v1.0/VR/registration/temporaryRegistration/:id", (req, res, next) => {
  //console.log("temporaryRegistration")
  var query = dbConn.query(
    "SELECT * FROM registration WHERE userId =?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
        return next("Mysql error, check your query");
      }
      console.log(rows)
      res.send(rows);
    }
  );
});

/**
 * @swagger
 * /api/v1.0/VR/registration/temporaryRegistration:
 *   post:
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/registration'
 *     responses:
 *       200:
 *         description: rows
 */

app.post("/api/v1.0/VR/registration/temporaryRegistration", (req, res, next) => {
  //console.log(req.body)
  res.send(req.body)
    //let data =req.body
  //let data = {
    //VIN: req.body.VIN,
    //chasis: req.body.chasis,
    //date_time: req.body.date_time,
    //userId: req.body.userId,
    //deviceId: req.body.deviceId,
   // devicelocation: req.body.devicelocation,
   // transaction_nbr: req.body.transaction_nbr,
  //  transaction_name: req.body.transaction_name,
  //  status: req.body.status,
    //approved: req.body.approved,
  //};
  let sql = "INSERT INTO registration SET?";
  let query = dbConn.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });
});


/**
 * @swagger
 * /api/v1.0/VR/registration/temporaryRegistration/{id}:
 *   delete:
 *     tags: [Registration]
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *              type: integer
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/registration'
 */
app.delete("/api/v1.0/VR/registration/temporaryRegistration/:id", function (req, res, next) {
  console.log(req.body);
  dbConn.query(
    "DELETE FROM registration WHERE userid = ?",
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "temporaryRegistration has been updated successfully.",
      });
    }
  );
});

/**
 * @swagger
 * /api/v1.0/VR/registration/temporaryRegistration/{id}:
 *  put:
 *    tags: [Registration]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The registration id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/registration'
 *    responses:
 *      200:
 *        description: The registration was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/registration'
 *      404:
 *        description: The registration was not found
 *      500:
 *        description: Some error happened
 */
app.put("/api/v1.0/VR/registration/temporaryRegistration", function (req, res, next) {
  console.log(req.body);
  var query = dbConn.query(
    "UPDATE registration SET transaction_name = 'puneet' WHERE userID = '1';",
    function (err, rows) {
      console.log("err", err, "\n rows", rows);
      if (err) {
        console.log(err);
        //return next("Mysql error, check your query");
      }
      res.send(rows);
    }
  );
});


app.listen(3000, console.log("APP IS Running"));
