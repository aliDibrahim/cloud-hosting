import AddArticleForm from "./AddArticleForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";

const Admin = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  if (!token) {
    redirect("/");
  }
  const payload = verifyTokenForPage(token);

  if (!payload || payload.isAdmin === false) {
    redirect("/");
  }
  return (
    <div className="w-[600px]  max-w-[90%] m-auto mt-10 mb-10">
      <h3 className="text-2xl text-blue-900 font-semibold mb-4">Add New Article</h3>
      <AddArticleForm />
    </div>
  );
};

export default Admin;
