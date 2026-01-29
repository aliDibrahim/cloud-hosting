import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateArticleDto } from "@/utils/dtos";
import prisma from "@/lib/prisma";
import { updateArticleSchema } from "@/utils/validationSchemas";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 *  @method  GET
 *  @route   ~/api/articles/:id
 *  @desc    Get Single Article By Id
 *  @access  public
 */
export async function GET(request: NextRequest, props: Props) {
  try {
    // Await the params
    const { id } = await props.params;
    const articleId = parseInt(id);
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        comments: {
          include: {
            user: {
              select: { id: true, username: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(article, { status: 200 });
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
 *  @route   ~/api/articles/:id
 *  @desc    Update Article
 *  @access  private (only admin can update article)
 */
export async function PUT(request: NextRequest, props: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }

    const { id } = await props.params;
    const articleId = parseInt(id);
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }

    const body = (await request.json()) as UpdateArticleDto;
    const { error } = updateArticleSchema.validate(body);

    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
// ----------------------------------------------------------------
/**
 *  @method  DELETE
 *  @route   ~/api/articles/:id
 *  @desc    Delete Article
 *  @access  private (only admin can delete article)
 */
export async function DELETE(request: NextRequest, props: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }
    const { id } = await props.params;
    const articleId = parseInt(id);

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      // include: { comments: true },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }

    // deleting the article
    await prisma.article.delete({ where: { id: articleId } });

    // deleting associated comments
    await prisma.comment.deleteMany({ where: { articleId: articleId } });

    return NextResponse.json({ message: "article deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
// ----------------------------------------------------------------
