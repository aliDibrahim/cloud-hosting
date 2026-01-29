import jwt from "jsonwebtoken";
import { JWTpayload } from "@/utils/types";
import { serialize } from "cookie";

// generate token
export function generateToken(payload: JWTpayload): string {
  const privateKey = process.env.JWT_SECRET as string;
  const token = jwt.sign(payload, privateKey, {
    expiresIn: "30d",
  });
  return token;
}

// set cookie with JWT
export function setCookie(jwtPayload: JWTpayload) {
  const token = generateToken(jwtPayload);

  const cookie = serialize("jwtToken", token, {
    // Makes the cookie inaccessible to JavaScript running in the browser
    httpOnly: false,
    // development: http , production: https
    secure: process.env.NODE_ENV === "production",
    // means the cookie is only sent for requests from the same site
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return cookie;
}
