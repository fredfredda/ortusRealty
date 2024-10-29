"use client";

import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#eb6753",
};

const ChangePasswordForm = () => {

  const [passwords, setPasswords] = useState({
    Oldpassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  let [color, setColor] = useState("#eb6753");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/editpassword`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: passwords.Oldpassword,
            newPassword: passwords.newPassword,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        toast.error(typeof data.error === 'string' ? data.error.toString() : "An error occurred");
      } else {
        toast.success(data.success.toString());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="mt20 mb20">
          <ClipLoader
            color={color}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <form
          className="form-style1"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="row">
            <div className="col-sm-6 col-xl-4">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Current Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your current password"
                  onChange={(e) =>
                    setPasswords({ ...passwords, Oldpassword: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
          {/* End .col */}

          <div className="row">
            <div className="col-sm-6 col-xl-4">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your new password"
                  onChange={(e) =>
                    setPasswords({ ...passwords, newPassword: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            {/* End .col */}

            <div className="col-sm-6 col-xl-4">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your new password"
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      confirmNewPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            {/* End .col */}

            <div className="col-md-12">
              <div className="text-end">
                <button type="submit" className="ud-btn btn-dark" disabled={isLoading}>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ChangePasswordForm;