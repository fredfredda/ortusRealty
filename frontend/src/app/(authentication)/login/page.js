import Image from "next/image";
import LoginSection from "@/components/common/login-signup/LoginSection";

export const metadata = {
  title: "Ortus Realty - Login",
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
        <LoginSection />
      </section>
    </>
  );
};

export default Login;
