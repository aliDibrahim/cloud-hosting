import { Article, Comment, User } from "@/generated/prisma/client";

export type CommentWithUser = Comment & { user: User };

export type SingleArticleType = Article & { comments: CommentWithUser[] };

export type JWTpayload = {
  id: number;
  isAdmin: boolean;
  username: string;
};
