"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sessionStore } from "@/store/session";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#eb6753",
};

const LoggingInSection = () => {
  const setSession = sessionStore((state) => state.setSession);
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect");
  let [color, setColor] = useState("#eb6753");

  useEffect(() => {
    const getGoogleUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/oauth/google?code=${code}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          if (redirect) {
            router.push(redirect);
          } else {
            router.push("/");
          }
        } else {
          localStorage.setItem("session", JSON.stringify(data));
          setSession(data);
          if (redirect && redirect !== null) {
            router.push(redirect);
          } else {
            router.push("/");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getGoogleUser();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <ClipLoader
        color={color}
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h2 style={{ color: "#eb6753" }}>Logging you in...</h2>
    </div>
  );
};

export default LoggingInSection;
