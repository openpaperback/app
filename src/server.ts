import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import mongoose from "mongoose";
import { router } from "./api/routes";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = express();

async function main() {
  await establishDatabase();

  router(app);

  app.use(compression({ threshold: 0 }));
  app.use(sirv("static", { dev }));
  app.use(sapper.middleware());

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

async function establishDatabase() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect("mongodb://localhost:27017/gutenbooks", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      tls: false,
    });
  } catch (error) {
    console.error("Error connecting to database");
    console.error(error);
  }
}

main();
