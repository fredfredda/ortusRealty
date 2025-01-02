import Image from "next/image";
import ResetPasswordSection from "@/components/common/reset-password/ResetPasswordSection";

export const metadata = {
  title: "Ortus Realty - Reset password",
};

const ResetPassword = ({params}) => {
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
        <ResetPasswordSection tokenId={params.id} />
      </section>
    </>
  );
};

export default ResetPassword;
