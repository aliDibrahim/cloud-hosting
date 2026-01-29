import { RegisterUserDto } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationSchemas";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
// import { setCookie } from '@/utils/generateToken';
import prisma from "@/lib/prisma";
import { setCookie } from "@/utils/generatetoken";
import { JWTpayload } from "@/utils/types";

/**
 *  @method  POST
 *  @route   ~/api/users/register
 *  @desc    Create New User (Register)
 *  @access  public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;
    const { error } = registerSchema.validate(body);

    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { message: "this user already registered" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        username: true,
        id: true,
        isAdmin: true,
      },
    });

    const jwtPayload: JWTpayload = {
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      username: newUser.username,
    };
    const cookie = setCookie(jwtPayload);

    return NextResponse.json(
      { ...newUser },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );

    // const cookie = setCookie({
    //     id: newUser.id,
    //     username: newUser.username,
    //     isAdmin: newUser.isAdmin,
    // });

    // return NextResponse.json(
    //     { ...newUser, message: "Registered & Authenticated" },
    //     {
    //         status: 201,
    //         headers: { "Set-Cookie": cookie }
    //     });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
