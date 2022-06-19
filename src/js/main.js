import { stdout } from 'process';
import "dotenv/config";
import server from "./server.js";
const PORT = process.env.PORT;
try {
    server.listen(PORT !== null && PORT !== void 0 ? PORT : 3000, () => stdout.write(`\nThe server was started on the port ${PORT}.\n`));
}
catch (error) {
    stdout.write(`err: ${error.message}.\n`);
}
