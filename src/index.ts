import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import * as morgan from "morgan";
import { port } from "./config";
import { validationResult } from "express-validator";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();

    //This middleware is responsible for parsing JSON data. It will parse incoming request bodies that have Content-Type: application/json. for diff content types, there are other other methods in body parser.
    app.use(bodyParser.json());

    app.use(morgan("dev"));

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        async (req: Request, res: Response, next: Function) => {
          try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).send({ errors: errors.array() });
            }

            const response = await new route.controller()[route.action](
              req,
              res,
              next
            );
            res.json(response);
          } catch (err) {
            next(err);
          }
        }
      );
    });

    // setup express app here

    // start express server
    app.listen(port);

    console.log(
      `Express server has started on port ${port}. Open http://localhost:3000/users to see results`
    );
  })
  .catch((error) => console.log(error));
