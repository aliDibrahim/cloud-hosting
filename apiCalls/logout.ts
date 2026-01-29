// apiCalls/logout.ts
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";

export async function logout(): Promise<boolean> {
  try {
    await axios.get(`${DOMAIN}/api/users/logout`);
    return true;
  } catch (error) {
    toast.warning("Something went wrong");
    console.log(error);
    return false;
  }
}
