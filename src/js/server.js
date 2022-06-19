import { createServer } from "http";
import requestHandler from './handlers/requestHandler.js';
import createUsersStorage from './db/users.js';
import { stdout, pid } from "process";
stdout.write("\nStarting server...\n");
export const usersStorage = createUsersStorage();
const server = createServer((req, res) => {
    stdout.write(`\nWorker ${pid} handles a request.\n`);
    const { status, statusMes, data, sendRes } = requestHandler(req, res);
    if (!sendRes) {
        return;
    }
    res.statusCode = status;
    res.statusMessage = statusMes !== null && statusMes !== void 0 ? statusMes : "";
    if (data) {
        res.setHeader("Content-type", "aplication/json");
    }
    res.end(data ? JSON.stringify(data) : "");
});
export default server;
