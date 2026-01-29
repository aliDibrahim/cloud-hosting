import { LoginUserDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchemas";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { setCookie } from "@/utils/generatetoken";
import { JWTpayload } from "@/utils/types";

/**
 *  @method  POST
 *  @route   ~/api/users/login
 *  @desc    Login User
 *  @access  public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;
    const { error } = loginSchema.validate(body);

    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }
    const jwtPayload: JWTpayload = {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    };

    const cookie = setCookie(jwtPayload);

    return NextResponse.json(
      { message: "Authenticated" },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
