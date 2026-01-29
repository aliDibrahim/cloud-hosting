import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { JWTpayload } from "@/utils/types";

// verify token for api end points
export function verifyToken(request: NextRequest): JWTpayload | null {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;
    if (!token) return null;

    const privateKey = process.env.JWT_SECRET as string;

    const userPayload = jwt.verify(token, privateKey) as JWTpayload;

    return userPayload;
  } catch (error) {
    return null;
  }
}

// verify token for pages
export function verifyTokenForPage(token: string): JWTpayload | null {
  try {
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as JWTpayload;
    if (!userPayload) {
      return null;
    }
    return userPayload;
  } catch (error) {
    return null;
  }
}
