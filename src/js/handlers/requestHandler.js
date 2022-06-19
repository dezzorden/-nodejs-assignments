import { STATUS_CODES } from "http";
import getHandler from "./getHandler.js";
import postHandler from "./postHandler.js";
import deleteHandler from "./deleteHandler.js";
import putHandler from "./putHandler.js";
export default function requestHandler(request, resp) {
    var _a, _b;
    try {
        const { method, url } = request;
        let response = { status: 404, statusMes: `${STATUS_CODES["404"]}: The page ${url} was not found.`, sendRes: true };
        const preHandle = (method) => {
            let userData;
            request.on("close", () => {
                if (!userData) {
                    resp.statusCode = 400;
                    resp.statusMessage = `${STATUS_CODES["400"]} : The request's body is probably empty.`;
                    resp.end();
                }
            });
            request.on("data", reqData => {
                var _a, _b;
                try {
                    userData = JSON.parse(reqData);
                    const { status, statusMes, data } = method === "POST" ? (_a = postHandler(url, userData)) !== null && _a !== void 0 ? _a : response : (_b = putHandler(url, userData)) !== null && _b !== void 0 ? _b : response;
                    resp.statusCode = status;
                    resp.statusMessage = statusMes !== null && statusMes !== void 0 ? statusMes : "";
                    if (data) {
                        resp.setHeader("Content-type", "aplication/json");
                    }
                    resp.end(data ? JSON.stringify(data) : "");
                }
                catch (error) {
                    resp.statusCode = 500;
                    resp.statusMessage = `${STATUS_CODES["500"]} : ${error.message}`;
                    resp.end();
                }
            });
        };
        switch (method) {
            case "GET":
                response = (_a = getHandler(url)) !== null && _a !== void 0 ? _a : response;
                break;
            case "POST":
                {
                    if (/\/api\/users/.test(url)) {
                        response.sendRes = false;
                    }
                    else {
                        break;
                    }
                    preHandle("POST");
                }
                break;
            case "PUT":
                {
                    if (/\/api\/users/.test(url)) {
                        response.sendRes = false;
                    }
                    else {
                        break;
                    }
                    preHandle("PUT");
                }
                break;
            case "DELETE":
                response = (_b = deleteHandler(url)) !== null && _b !== void 0 ? _b : response;
                break;
            default: return { status: 501, statusMes: STATUS_CODES["501"], sendRes: true };
        }
        return response;
    }
    catch (error) {
        return { status: 500, statusMes: `${STATUS_CODES["500"]} : ${error.message}`, sendRes: true };
    }
}
