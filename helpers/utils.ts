import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } from "../config";
import { Response } from "express";

export const encryptPassword = (password: string) =>
    new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
                return false;
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                    return false;
                }
                resolve(hash);
                return true;
            });
        });
    });

export const comparePassword = (password: string, hash: string) =>
    new Promise(async (resolve, reject) => {
        try {
            const isMatch = await bcrypt.compare(password, hash);
            resolve(isMatch);
            return true;
        } catch (err) {
            reject(err);
            return false;
        }
    });

export const createAccessToken = (payload: any) => {
    const token = sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
    return token;
};
export const createRefreshToken = (payload: any) => {
    const token = sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return token;
};

export const getPayload = (token: string) => {
    try {
        const payload = verify(token, ACCESS_TOKEN_SECRET);
        return payload
    } catch (err) {
        return null;
    }
};

export const getPayloadByRefreshToken = (token: string) => {
    try {
        const payload = verify(token, REFRESH_TOKEN_SECRET);
        return payload;
    } catch (err) {
        return null;
    }
}

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("jid", token, { httpOnly: true })

}