"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { sessionStore } from "@/store/session";
import { useSearchParams, useRouter } from "next/navigation";
import getGooleOAuthUrl from "@/utilis/getGoogleUrl";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

const SignIn = ({ setPageTitle }) => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams() || {};
  const redirect = searchParams.get("redirect") || '/';

  const setSession = sessionStore((state) => state.setSession);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationEmail, setVerificationEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        toast.error(
          typeof data.error === "string" ? data.error : "An error occured"
        );
      } else {
        localStorage.setItem("session", JSON.stringify(data));
        setSession(data);
        toast.success("logged in successfully");
        document.getElementById("loginForm").reset();
        if (redirect && redirect !== null) {
          if (redirect === "/explore") {
            router.replace("/explore?showFilter=true");
          } else {
            router.replace(redirect);
          }
        } else {
          router.replace("/");
        }
      }
    } catch (error) {
      console.error(error);
    toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/auth/sendemail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: verificationEmail,
          }),
        }
      );

      const data = await response.json();
      if (data.error) {
        toast.error(
          typeof data.error === "string" ? data.error : "An error occurred"
        );
      } else {
        localStorage.setItem("resetPasswordToken", JSON.stringify(data.token));
        setEmailSent(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="loginForm" className="form-style1">
      {showSignIn && (
        <>
          <div className="mb25">
            <label className="form-label fw600 dark-color">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* End Email */}

          <div className="mb20">
            <label className="form-label fw600 dark-color">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* End Password */}

          <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
            <a
              className="fz14 ff-heading"
              href={`/register?redirect=${redirect}`}
            >
              Don&apos;t have an account? Sign Up
            </a>
            <p
              className="fz14 ff-heading mt10 forgot_password"
              onClick={() => {
                setShowSendEmail(true);
                setShowSignIn(false);
                setPageTitle("Verification Link");
              }}
            >
              Forgot password?
            </p>
          </div>
          {/* End  Lost your password? */}

          <div className="d-grid mb20">
            <button
              className="ud-btn btn-thm"
              data-bs-dismiss=""
              disabled={isLoading}
              onClick={handleSubmit}
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
                <>Sign in</>
              )}
            </button>
          </div>
          {/* End submit */}

          <div className="hr_content mb20">
            <hr />
            <span className="hr_top_text">OR</span>
          </div>

          <div className="d-grid mb10">
            <button className="ud-btn btn-white" type="button">
              <a href={getGooleOAuthUrl(redirect || "")}>
                <i className="fab fa-google" /> Continue With Google
              </a>
            </button>
          </div>
        </>
      )}

      {showSendEmail &&
        (emailSent ? (
          <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-center mb10">
            <p>Check your email inbox for the link</p>
          </div>
        ) : (
          <>
            <div className="mb15">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                onChange={(e) => setVerificationEmail(e.target.value)}
                required
              />
            </div>
            <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
              <p className="fz14 ff-heading mt10">
                A verification link will be sent to your email
              </p>
            </div>
            <div className="d-grid mb20">
              <button
                className="ud-btn btn-thm"
                data-bs-dismiss=""
                disabled={isLoading}
                onClick={handleSendEmail}
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
                  <>Send Email</>
                )}
              </button>
            </div>
          </>
        ))}
    </form>
  );
};

export default SignIn;
