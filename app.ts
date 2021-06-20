import express from "express";
import graphqlServer from "./graphql";
import CookieParser from 'cookie-parser';
import { createAccessToken, getPayload, getPayloadByRefreshToken } from "./helpers";
import { prisma } from "./db";

const app = express();
app.use(CookieParser());
app.post("/refresh_token", async (req, res) => {
  const refreshToken = req.cookies.jid;
  if (!refreshToken) res.send({ ok: false, accessToken: "" })

  let payload: any = null;
  payload = getPayloadByRefreshToken(refreshToken);
  if (!payload) return res.send({ ok: false, accessToken: "" });

  console.log("payload", payload)
  const userFound = await prisma.user.findUnique({
    where: {
      ID: payload.userID
    }
  })

  if (!userFound) return res.send({ ok: false, accessToken: "" });
  console.log("userFound",userFound,payload)
  if (userFound.tokenVersion !== payload.tokenVersion) return res.send({ ok: false, accessToken: "" });

  return res.send({ ok: true, accessToken: createAccessToken(userFound) })

})

graphqlServer.applyMiddleware({
  app,
});

export default app;
