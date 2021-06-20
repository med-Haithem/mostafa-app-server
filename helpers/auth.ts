import { MyContext } from "../types";
import { getPayload } from "./utils";


export const isAuthenticated = (next: Function) => (root: any, args: any, context: MyContext, info: any) => {

    const authorization = context.req.headers["authorization"];
    if (!authorization) throw new Error("Not Authenticated!");
    try {
        const accessToken = authorization.split(" ")[1];
        const payload = getPayload(accessToken);
        context.payload = payload as any;
    }
    catch {
        throw new Error("Not Authenticated!");
    }
    return next(root, args, context, info);
};

