"use client";

import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#eb6753",
};

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  let [color, setColor] = useState("#eb6753");

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/profile`,
          {
            headers: {
              authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          toast.error(typeof data.error === 'string' ? data.error : "An error occurred");
        } else {
          setUserInfo({
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
          });
        }
      } catch (error) {
        console.error(error);        
        toast.error("An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/editprofile`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
          body: JSON.stringify({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      } else {
        toast.success("Profile updated");
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
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  value={userInfo.email}
                  disabled={true}
                  required
                />
              </div>
            </div>
            {/* End .col */}

            <div className="col-sm-6 col-xl-4">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={userInfo.firstName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, firstName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            {/* End .col */}

            <div className="col-sm-6 col-xl-4">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={userInfo.lastName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            {/* End .col */}

            <div className="col-md-12">
              <div className="text-end">
                <button
                  type="submit"
                  className="ud-btn btn-dark"
                  disabled={isLoading}
                >
                  Update Profile
                </button>
              </div>
            </div>
            {/* End .col */}
          </div>
        </form>
      )}
    </>
  );
};

export default PersonalInfo;