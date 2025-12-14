### An Express.js web server

- Serves static files (like CSS).
- Shows a homepage.
- Has routes to view logs (errors/success).
- Has a demo error route.
- Handles errors globally.
- Shows a custom 404 page.

---

## Application Flow

1. `npm run dev` starts `ts-node-dev` with `src/server.ts`.
2. `src/server.ts` imports the Express app from `src/app.ts` and starts the HTTP server with `app.listen(process.env.PORT)`.
3. `src/app.ts` initializes the Express app:
   - Serves static files from `public`.
   - Parses JSON request bodies.
   - Mounts log routes under `/logs`.
   - Registers global error handler and 404 handler.
4. Requests are routed to controllers to render HTML pages that list or show log files.
5. Errors bubble to the global error middleware for logging and friendly responses.

---

## File Connections

- `src/server.ts`

  - Imports `app` (`src/app.ts`).
  - Uses `logger` and `errorlogger` (`src/app/src/shared/logger.ts`) for startup messages and error reporting.
  - Handles `process.on('unhandledRejection')` and `process.on('uncaughtException')` for crash-safe shutdown.

- `src/app.ts`

  - Creates the Express `Application`.
  - `express.static` serves `public/styles.css`.
  - `express.json` parses JSON payloads.
  - Routes:
    - `/` home page with links to `/logs/errors` and `/logs/successes`.
    - `/error` throws a test error (to validate error logging).
    - `/logs` mounts `LogsRoutes` from `src/app/src/modules/Logs/logs.routes.ts`.
  - Registers:
    - Global error handler (logs via `errorlogger`).
    - 404 not-found handler.

- `src/app/src/modules/Logs/logs.routes.ts`

  - Declares log-related routes and maps them to controller methods in `logs.controller.ts`.

- `src/app/src/modules/Logs/logs.controller.ts`

  - Implements handlers that render HTML pages:
    - List log files by reading directories via `listLogFiles`.
    - Display a specific log file's content in `<pre>...</pre>` blocks.

- `src/app/src/helpers/listLogFiles.ts`

  - Reads `process.cwd()/logs/winston/<type>` for `.log` files and returns them as a list.
  - Used by the logs controller to display available files.

- `src/app/src/shared/logger.ts`

  - Defines two Winston loggers:
    - `logger` (info level) writes to console and `logs/winston/successes`.
    - `errorlogger` (error level) writes to console and `logs/winston/errors`.
  - Uses `winston-daily-rotate-file` for rotating log files with date-based naming.

- `public/styles.css`

  - Styles for the HTML responses.

- `tsconfig.json`

  - Strict TypeScript settings; compiles to `dist`.

- `Dockerfile`
  - Node 20 base image, installs dependencies, copies source, exposes `5000`, runs `npm run dev`.

---

## Endpoints

- `GET /`  
  Home page linking to error/success logs.

- `GET /error`  
  Forces an error to test logging and error handling.

- `GET /logs/errors`  
  Lists all error log files located in `logs/winston/errors`.

- `GET /logs/successes`  
  Lists all success log files located in `logs/winston/successes`.

- `GET /logs/errors/:logfile`  
  Shows the contents of a specific error log file.

- `GET /logs/successes/:logfile`  
  Shows the contents of a specific success log file.

---

## Logging (Winston + Rotation)

- Loggers:

  - `logger`:
    - Level: `info`.
    - Outputs: console + `logs/winston/successes/docker-%DATE%-success.log`.
    - Date pattern: `YYYY-MM-DD-HH-mm-ss`.
  - `errorlogger`:
    - Level: `error`.
    - Outputs: console + `logs/winston/errors/docker-%DATE%-error.log`.
    - Date pattern: `YYYY-MM-DD-HH`.

- Custom format:

  - Combines `label`, `timestamp`, and a `printf` formatter to produce readable lines like:
    ```
    Tue Sep 10 2024 12:34:56 } [DOCKER] info: app is listening on port 5000
    ```

- Log storage:

  - Success logs: `logs/winston/successes/`.
  - Error logs: `logs/winston/errors/`.
  - Rotation settings: `maxSize: 20m`, `maxFiles: 14d`.

- Operational note:
  - Ensure the `logs` directories are writable and persist when running in Docker (use a volume).

---

## Error Handling

- Route errors:

  - Any thrown error in routes is caught by the global error middleware.
  - The middleware logs via `errorlogger` and returns a user-friendly HTML page.

- 404 handler:

  - A final middleware returns a styled “Page Not Found” page for unmatched routes.

- Process-level events:
  - `unhandledRejection`: logs, gracefully closes the server if running, then exits the process.
  - `uncaughtException`: logs and exits immediately.

---

## Static Assets

- `express.static` serves files from the `public` directory.
- `styles.css` is linked in HTML responses to provide consistent styling.

---

## TypeScript Configuration

- `strict: true` enforces strong type safety.
- `esModuleInterop: true` improves compatibility with CommonJS modules.
- `outDir: "./dist"` emits compiled JavaScript files under `dist`.
- Typical usage:
  - Development: `npm run dev` (no build step).
  - Production: `npm run build` then `npm run start`.

---

## Environment Variables

- `PORT`:
  - Required. Used by `app.listen(process.env.PORT)` to choose the listening port.
  - Example setup on Windows:

```bash
set PORT=5000
```

- In Docker, `EXPOSE 5000` is declared, but you must still pass `PORT=5000` to the container.

---

## Docker Usage

Build the image:

```bash
docker build -t docker-ts-backend .
```

Run the container with port and persistent logs:

```bash
docker run -e PORT=5000 -p 5000:5000 -v ${pwd}\logs:/app/logs docker-ts-backend
```

Notes:

- `-e PORT=5000` sets the port.
- `-p 5000:5000` maps host port 5000 to container port 5000.
- `-v ${pwd}\logs:/app/logs` persists logs to your current directory on Windows PowerShell.

---

## Node & Express Overview (Applied Here)

- Node.js:

  - JavaScript runtime for building server-side applications.
  - Uses asynchronous, event-driven I/O for scalability.
  - `process.env` stores environment variables; `process.on(...)` handles global error events.

- Express:
  - Minimal web framework for routing and middleware.
  - Middleware pipeline:
    - `express.static` for serving assets.
    - `express.json` for parsing JSON request bodies.
    - Custom routers mounted at paths (`app.use("/logs", LogsRoutes)`).
    - Error-handling middleware (`(err, req, res, next) => { ... }`) runs when a route throws.
    - 404 middleware for unmatched routes.
  - Routers (`express.Router`) group related endpoints; controllers separate concerns.

---

## Future Improvements

- Configuration:

  - Provide defaults for `PORT` (e.g., fallback to `5000` if unset).
  - Add environment-based logger configuration (e.g., disable console logs in production).

- Features:

  - Authentication with `jsonwebtoken` (currently installed but unused).
  - Date/time formatting via `moment` (installed but unused).
  - JSON API endpoints that return structured data alongside HTML pages.

- Stability:
  - Unit tests for controllers and helpers.
  - Health-check endpoint (e.g., `GET /health`) for container orchestration.

---
