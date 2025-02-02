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
import { savedPropertiesStore } from "@/store/savedProperties";
import { checkCookie } from "@/utilis/checkCookie.js";

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

  const appendProperty = savedPropertiesStore((state) => state.appendProperty);
  const resetProperties = savedPropertiesStore(
    (state) => state.resetProperties
  );

  useEffect(() => {
    const getSavedProperties = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/savedproperties`,
          {
            headers: {
              authorization: `Bearer ${
                JSON.parse(localStorage.getItem("token")) || ""
              }`,
            },
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
        } else {
          resetProperties();
          for (let i = 0; i < data.properties.length; i++) {
            appendProperty(data.properties[i].property_id);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (session?.userId) {
      getSavedProperties();
    }
  }, [session]);

  useEffect(() => {
    const checkSession = () => {
      setIsLoading(true);
      const isLoggedIn = checkCookie();
      if (isLoggedIn === true) {
        const session_ = JSON.parse(localStorage.getItem("session"));
        setSession(session_);
      } else {
        localStorage.removeItem("session");
        localStorage.removeItem("token");
        deleteSession();
        resetProperties();
      }
      setIsLoading(false);
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
