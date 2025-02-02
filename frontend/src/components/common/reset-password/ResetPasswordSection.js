"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

const ResetPasswordSection = ({ tokenId }) => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword();
  };

  const updatePassword = async () => {
    if (password !== confirmedPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/auth/reset-password/${tokenId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            password: password,
            token: JSON.parse(localStorage.getItem("resetPasswordToken")),
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        toast.error(typeof data.error === "string" ? data.error : "An error occured");
      } else {
        localStorage.removeItem("resetPasswordToken");
        toast.success("Password reset successfully");
        document.getElementById("passwordResetForm").reset();
        router.replace("/login?redirect=/");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

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
              <h2>Reset password</h2>
            </div>
            <form
              id="passwordResetForm"
              className="form-style1"
              onSubmit={handleSubmit}
            >
              <div className="mb20">
                <label className="form-label fw600 dark-color">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* End Password */}

              <div className="mb20">
                <label className="form-label fw600 dark-color">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your new password"
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  required
                />
              </div>
              {/* End Password */}

              <div className="d-grid mb20">
                <button
                  className="ud-btn btn-thm"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ClipLoader
                      color={color}
                      loading={isLoading}
                      cssOverride={override}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    <>Change password</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordSection;
