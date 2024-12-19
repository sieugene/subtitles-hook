import core from "express";
import cors from "cors";
import bodyParser from "body-parser";

export class App {
  constructor(
    private readonly app: core.Express,
    private readonly port: number
  ) {
    this.initMiddlewares();
  }

  private initMiddlewares() {
    console.log("Middlewares is initializing");
    this.app.use(
      cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.use(bodyParser.json());
    console.log("Middlewares initializing is end");
  }

  run() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }

  get root() {
    return this.app;
  }
}
