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

const SignUp = () => {
  const setSession = sessionStore((state) => state.setSession);

  const router = useRouter();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  const registerUser = async () => {
    if (confirmedPassword !== password) {
      toast.error("passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        toast.error(
          typeof data.error === "string" ? data.error : "An error occured"
        );
      } else {
        localStorage.setItem("session", JSON.stringify(data));
        setSession(data);
        toast.success("account created successfully");
        document.getElementById("signupform").reset();
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
      toast.error("An error occured");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="signupform" className="form-style1" onSubmit={handleSubmit}>
      <div className="mb25">
        <label className="form-label fw600 dark-color">First Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter First Name"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      {/* End Email */}

      <div className="mb25">
        <label className="form-label fw600 dark-color">Last Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      {/* End Email */}

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

      <div className="mb20">
        <label className="form-label fw600 dark-color">Confirm password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Confirm your password"
          onChange={(e) => setConfirmedPassword(e.target.value)}
          required
        />
      </div>
      {/* End Password */}

      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <a className="fz14 ff-heading" href={`/login?redirect=${redirect}`}>
          Already have an account? Sign In
        </a>
      </div>
      {/* End  Already have an account? */}

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit" disabled={isLoading}>
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
            <>Create account</>
          )}
        </button>
      </div>
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
    </form>
  );
};

export default SignUp;
