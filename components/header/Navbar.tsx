"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./header.module.css";
import { logout } from "@/apiCalls/logout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Payload {
  username?: string;
  isAdmin?: boolean;
  id?: number;
}

interface NavbarProps {
  payload: Payload | null;
}

const Navbar = ({ payload }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    const success = await logout();
    console.log("logout success:", success);
    if (success) {
      // window.location.replace("/");
    router.push("/");
      router.refresh();

      toast.success("User logged out successfully");
    }
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div>
        <Link href={"/"} className={styles.logo}>
          CLOUD <GrTechnology /> HOSTING
        </Link>
      </div>

      {/* Desktop Links */}
      <div
        className={styles.linksWrapper}
        style={{
          clipPath: isOpen ? "circle(150% at 90% 0%)" : "circle(0% at 90% 0%)",
        }}
      >
        <ul className={`${styles.links} ${styles.desktopLinks}`}>
          <Link
            href={"/"}
            className={styles.link}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Home
          </Link>
          <Link
            href={"/articles?pageNumber=1"}
            className={styles.link}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Articles
          </Link>
          <Link
            href={"/about"}
            className={styles.link}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            About
          </Link>

          {/* Show Admin Dashboard only if user is admin */}
          {payload?.isAdmin && (
            <Link
              href={"/admin"}
              className={styles.link}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Admin Dashboard
            </Link>
          )}

          <div className={styles.right}>
            {payload ? (
              <>
                <span className={styles.userWelcome}>{payload.username}</span>
                <button
                  onClick={async () => {
                    handleLogout();
                  }}
                  className={styles.btn}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href={"/login"}
                  className={styles.btn}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href={"/register"}
                  className={styles.btn}
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className={styles.mobileMenuIcon}>
        {isOpen ? (
          <FaTimes size={24} onClick={() => setIsOpen(false)} />
        ) : (
          <FaBars size={24} onClick={() => setIsOpen(true)} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
