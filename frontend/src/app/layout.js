"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import "aos/dist/aos.css";
import "../../public/scss/main.scss";
import "rc-slider/assets/index.css";
import { DM_Sans, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getSession } from "@/utilis/auth";
import { sessionStore } from "@/store/session";

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
  const setSession = sessionStore((state) => state.setSession);
  const deleteSession = sessionStore((state) => state.deleteSession);

  useEffect(() => {
    const checkSession = async () => {
      const session_ = await getSession();
      if (session_ !== null) {
        setSession(session_);
      } else {
        deleteSession();
      }
    };
    checkSession();
  }, []);

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
