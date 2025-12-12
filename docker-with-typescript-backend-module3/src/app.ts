import express, { Application, Request, Response } from "express";
import path from "path";
import { LogsRoutes } from "./app/src/modules/Logs/logs.routes";
import { errorlogger } from "./app/src/shared/logger";

const app: Application = express(); //? creating the express application / the web server

// Serve static files like CSS
app.use(express.static(path.join(__dirname, "../public"))); // Adjusted path

// Parsers
app.use(express.json()); //?  This allows Express to understand JSON data sent by clients.

// Welcome route
//? When someone visits the root URL /, they see an HTML page with links: /logs/errors and /logs/successes. This is the "homepage" of your app.
app.get("/", (req: Request, res: Response) => {
  res.status(200).send(`
   <html>
      <head>
        <title>Docker Logs Viewer</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Welcome to the Docker Logs Viewer Page!</h1>
        <p>Go to <a href="/logs/errors">Error Logs</a> or <a href="/logs/successes">Success Logs</a>.</p>
      </body>
    </html>
  `);
});

app.get("/error", (req: Request, res: Response) => {
  throw new Error("This is a forced error!"); //* This intentionally throws an error — for testing your error logger.
});

//Logger Routes
app.use("/logs", LogsRoutes); // * /logs/errors and /logs/successes handled in logs.routes

// * Global Error handler - This runs whenever any route throws an error.
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err);
  errorlogger.error(err);

  res.status(500).send(`
    <html>
      <head>
        <title>Error</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Something went wrong</h1>
        <p>${err.message}</p>
        <a href="/">Back to Home</a>
      </body>
    </html>
  `);
});

// Not Found handler
app.use((req: Request, res: Response) => {
  res.status(404).send(`
    <html>
      <head>
        <title>Page Not Found</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/">Back to Home</a>
      </body>
    </html>
  `);
});

export default app;
