import { DOMAIN } from "@/utils/constants";
import { Comment } from "@/generated/prisma/client";

// Get all comments
export async function getAllComments(token: string): Promise<Comment[]> {
  const response = await fetch(`${DOMAIN}/api/comments`, {
    headers: {
      Cookie: `jwtToken=${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
}

// note
/*
in the previous conde, we send the cookie in the header, beacuse we
 use this function in server side component (app/admin/comments-table/page.tsx), so we have to send the 
 cookie manually.(server side component don't have access to cookies by default)
*/
