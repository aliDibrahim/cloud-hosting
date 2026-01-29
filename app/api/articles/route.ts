import { NextRequest, NextResponse } from "next/server";
// import { createArticleSchema } from '@/utils/validationSchemas';
// import { CreateArticleDto } from '@/utils/dtos';
// import { Article } from '@prisma/client';
// import prisma from '@/utils/db';
import { pageSize } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";
import { createArticleSchema } from "@/utils/validationSchemas";
import { CreateArticleDto } from "@/utils/dtos";
import prisma from "@/lib/prisma";
import { Article } from "@/app/generated/prisma/client";
// ----------------------------------------------------------------
/**
 *  @method  GET
 *  @route   ~/api/articles
 *  @desc    Get All Articles By PageNumber
 *  @access  public
 */
export async function GET(request: NextRequest) {
  try {
    // get the pageNumber from the query params
    const pageParam = request.nextUrl.searchParams.get("pageNumber");
    const pageNumber = pageParam ? parseInt(pageParam) : 1;
    // calculate how many rows to skip
    const skip = (pageNumber - 1) * pageSize;
    // fetch articles with pagination
    const articles = await prisma.article.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });
    return Response.json(articles);
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
// ----------------------------------------------------------------
/**
 *  @method  POST
 *  @route   ~/api/articles
 *  @desc    Create A New Article
 *  @access  private (only admin can create article)
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateArticleDto;
    const { error } = createArticleSchema.validate(body);

    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
// ----------------------------------------------------------------
