import { NextResponse, NextRequest } from "next/server";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { updateUserSchema } from "@/utils/validationSchemas";
import prisma from "@/lib/prisma";
// import jwt from "jsonwebtoken";
// import { JWTpayload } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";
// ----------------------------------------------------------------
interface Props {
  params: Promise<{ id: string }>;
}
// ----------------------------------------------------------------
/**
 *  @method  DELETE
 *  @route   ~/api/users/profile/:id
 *  @desc    Delete Profile
 *  @access  private (only user himself can delete his account)
 */
export async function DELETE(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    const userId = parseInt(id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken !== null && userFromToken.id === user.id) {
      // deleting the user
      await prisma.user.delete({ where: { id: userId } });

      // deleting associated comments
      await prisma.comment.deleteMany({ where: { userId: userId } });
      return NextResponse.json(
        { message: "your profile account has been deleted" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "only user himself can delete his profile, forbidden" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
// ----------------------------------------------------------------
/**
 *  @method  GET
 *  @route   ~/api/users/profile/:id
 *  @desc    Get Profile By Id
 *  @access  private (only user himself can get his account/profile)
 */
export async function GET(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    const userId = parseInt(id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
// ----------------------------------------------------------------
/**
 *  @method  PUT
 *  @route   ~/api/users/profile/:id
 *  @desc    Update Profile
 *  @access  private (only user himself can update his account/profile)
 */
export async function PUT(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    const userId = parseInt(id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }

    const body = (await request.json()) as UpdateUserDto;
    const { error } = updateUserSchema.validate(body);
    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });

    const { password, ...other } = updatedUser;
    return NextResponse.json({ ...other }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
// ----------------------------------------------------------------
