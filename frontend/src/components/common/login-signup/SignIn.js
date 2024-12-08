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

const SignIn = () => {

  const router = useRouter();

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const setSession = sessionStore((state) => state.setSession);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("session", JSON.stringify(data));
        setSession(data);
        document.getElementById("loginForm").reset();
        if (redirect) {
          router.replace(redirect);
        } else {
          router.replace("/");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="loginForm" className="form-style1" onSubmit={handleSubmit}>
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
        <a className="fz14 ff-heading" href={`/register?redirect=${redirect}`}>
          Don't have an account? Sign Up
        </a>
      </div>
      {/* End  Lost your password? */}

      <div className="d-grid mb20">
        <button
          className="ud-btn btn-thm"
          type="submit"
          data-bs-dismiss=""
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
            <>
              Sign in <i className="fal fa-arrow-right-long" />
            </>
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
          <a href={getGooleOAuthUrl(redirect || '')}>
            <i className="fab fa-google" /> Continue With Google
          </a>
        </button>
      </div>
    </form>
  );
};

export default SignIn;
