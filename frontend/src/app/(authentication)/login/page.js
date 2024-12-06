import SignIn from "@/components/common/login-signup/SignIn";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Ortus Realty",
};

const Login = () => {
  return (
    <>
      {/* Our Compare Area */}
      <section className="our-compare pt60 pb60">
        <Image
          width={1012}
          height={519}
          src="/images/icon/login-page-icon.svg"
          alt="logo"
          className="login-bg-icon contain"
        />
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
                  <h2>Sign in</h2>
                </div>
                <SignIn />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;