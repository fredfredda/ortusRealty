"use client";
import React, {useState} from "react";
import SignIn from "@/components/common/login-signup/SignIn";
import Image from "next/image";
import Link from "next/link";

const LoginSection = () => {
  const [pageTitle, setPageTitle] = useState("Sign In");
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="log-reg-form signup-modal form-style1 bgc-white p50 p30-sm default-box-shadow2 bdrs12">
            <div className="text-center mb40">
              <Link href="/">
                <Image
                  width={138}
                  height={44}
                  className="mb25"
                  src="/images/ortus_realty_logo.svg"
                  alt="logo"
                />
              </Link>
              <h2>{pageTitle}</h2>
            </div>
            <SignIn setPageTitle={setPageTitle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
