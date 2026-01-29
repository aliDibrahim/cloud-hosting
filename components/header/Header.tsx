// import Link from "next/link";
import styles from "./header.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";

const Header = async () => {
  // get the token from cookies
  const cookieStore = await cookies(); 
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  return (
    <header className={styles.header}>
      <Navbar payload={payload} />
    </header>
  );
};

export default Header;
