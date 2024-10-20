"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import "aos/dist/aos.css";
import "../../public/scss/main.scss";
import "rc-slider/assets/index.css";
import { DM_Sans, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { sessionStore } from "@/store/session";
import { isLoadingStore } from "@/store/isLoading";

if (typeof window !== "undefined") {
  import("bootstrap");
}

// DM_Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--body-font-family",
});

// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

export default function RootLayout({ children }) {
  const session = sessionStore((state) => state.session);

  const setSession = sessionStore((state) => state.setSession);
  const deleteSession = sessionStore((state) => state.deleteSession);

  const isLoading = isLoadingStore((state) => state.isLoading);
  const setIsLoading = isLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3001/api/auth/checksession",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
        } else {
          if (data.isLoggedIn === "true") {
            const session_ = JSON.parse(localStorage.getItem("session"));
            setSession(session_);
          } else {
            localStorage.removeItem("session");
            deleteSession();
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  // useEffect(() => {
  //   console.log(session);
  // }, [session]);

  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <html lang="en">
      <body
        className={`body  ${poppins.variable} ${dmSans.variable}`}
        cz-shortcut-listen="false"
      >
        <Toaster position="bottom-left" />

        <div className="wrapper ovh">{children}</div>

        <ScrollToTop />
      </body>
    </html>
  );
}
