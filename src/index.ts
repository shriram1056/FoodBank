import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import * as morgan from "morgan";

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
    app.listen(3000);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch((error) => console.log(error));
