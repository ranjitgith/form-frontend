"use client";
import React, { useState, useEffect } from "react";
import validation from "./utils/validation";
import Table from "../components/Table";
import { getUserData, postUserData } from "./utils/fetchApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [data, setData] = useState({
    uid: "",
    pwd: "",
    gender: "",
    Hobbies: "",
    cnty: "",
    address: "",
  });
  const [errorMsg, setErrorMsg] = useState({});
  const [fetchedData, setFetchedData] = useState([]);

  const handleUser = (e) => {
    const { value, name, type, checked } = e.target;
    if (type === "checkbox") {
      var checkedValues = data["Hobbies"] ? data["Hobbies"].split(",") : [];
      if (checked) {
        checkedValues.push(value);
      } else {
        checkedValues.splice(checkedValues.indexOf(value), 1);
      }
      setData({ ...data, Hobbies: checkedValues.join(",") });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  // function to clear errorMsg after 3 sec
  const clearError = () => {
    setTimeout(() => {
      setErrorMsg({});
    }, 3000);
  };

  const handleSubmit = async () => {
    let isValid = true;
    const clonedData = JSON.parse(JSON.stringify(data));
    const clonedArr = Object.entries(clonedData);
    const errorMsgObj = {};

    // checking for validations
    clonedArr.map(([key, value]) => {
      const errorMsg = validation(key, value);
      errorMsgObj[key] = errorMsg;
    });

    // checking if there is errorMsg or not if there is no errorMsg then send the post request
    const errorMsgArr = Object.entries(errorMsgObj);

    errorMsgArr.map(([key, value]) => {
      if (value !== "") {
        isValid = false;
        return;
      }
    });

    if (isValid) {
      const res = await postUserData(data);
      if (res.acknowledged && res.insertedId) {
        toast("Successfully inserted");
        getUserData().then((data) => setFetchedData(data));
      }
      setData({
        uid: "",
        pwd: "",
        gender: "",
        Hobbies: "",
        cnty: "",
        address: "",
      });
    } else {
      setErrorMsg(errorMsgObj);
      clearError();
    }
  };

  useEffect(() => {
    getUserData().then((data) => setFetchedData(data));
  }, []);

  return (
    <div className="bg-slate-900 text-white">
      {/* Tostify container*/}
      <ToastContainer />

      {/* header */}
      <div className=" bg-slate-600 p-4 w-full">
        <h2 className="font-bold text-xl">Registration Page</h2>
      </div>

      {/* form */}
      <div className="flex justify-center my-20">
        <div className="max-w-md  shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-gray-700">
          <h1 className="text-3xl mb-4">Register</h1>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              UserId:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="uid"
                value={data?.uid || ""}
                placeholder="Enter UserId"
                onChange={handleUser}
              />
            </label>
            <div className="mx-auto my-2 text-center">
              {errorMsg.uid && (
                <span className="text-red-500 font-semibold">
                  {errorMsg.uid}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="pwd"
                value={data?.pwd || ""}
                placeholder="Enter Password"
                onChange={handleUser}
              />
            </label>
            <div className="mx-auto my-2 text-center">
              {errorMsg.pwd && (
                <span className="text-red-500 font-semibold">
                  {errorMsg.pwd}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Gender:
            </label>
            <div className="flex">
              <label className="mr-4">
                <input
                  className="mr-2 leading-tight"
                  type="radio"
                  value="male"
                  checked={"male" === data?.gender}
                  name="gender"
                  onChange={handleUser}
                />
                Male
              </label>
              <label className="mr-4">
                <input
                  className="mr-2 leading-tight"
                  type="radio"
                  value="female"
                  name="gender"
                  checked={"female" === data?.gender}
                  onChange={handleUser}
                />
                Female
              </label>
              <label className="mr-4">
                <input
                  className="mr-2 leading-tight"
                  type="radio"
                  value="other"
                  name="gender"
                  checked={"other" === data?.gender}
                  onChange={handleUser}
                />
                Other
              </label>
            </div>
            <div className="mx-auto my-2 text-center">
              {errorMsg.gender && (
                <span className="text-red-500 font-semibold">
                  {errorMsg.gender}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Hobbies:
            </label>
            <div className="flex">
              <label className="mr-4">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  name="cric"
                  value="cric"
                  checked={data?.Hobbies?.includes("cric") || false}
                  onChange={handleUser}
                />
                Cricket
              </label>
              <label className="mr-4">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  name="ft"
                  value="ft"
                  checked={data?.Hobbies?.includes("ft") || false}
                  onChange={handleUser}
                />
                Football
              </label>
              <label className="mr-4">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  name="kh"
                  value="kho-kho"
                  checked={data?.Hobbies?.includes("kho-kho") || false}
                  onChange={handleUser}
                />
                Kho-Kho
              </label>
              <label className="mr-4">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  name="chesss"
                  value="chess"
                  checked={data?.Hobbies?.includes("chess") || false}
                  onChange={handleUser}
                />
                Chess
              </label>
            </div>
            <div className="mx-auto my-2 text-center">
              {errorMsg.Hobbies && (
                <span className="text-red-500 font-semibold">
                  {errorMsg.Hobbies}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Country:
            </label>
            <select
              className="shadow appearance-none border rounded w-full text-sm font-bold py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              name="cnty"
              onChange={handleUser}
              value={data?.cnty || ""}
            >
              <option>Select</option>
              <option>India</option>
              <option>China</option>
              <option>London</option>
              <option>Pakistan</option>
            </select>
            <div className="mx-auto my-2 text-center">
              {errorMsg.cnty && (
                <span className="text-red-500 font-semibold">
                  {errorMsg.cnty}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Address:
            </label>
            <textarea
              className="shadow appearance-none border rounded text-sm font-bold w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              name="address"
              onChange={handleUser}
              value={data?.address || ""}
            ></textarea>
            <div className="mx-auto my-2 text-center">
              {errorMsg.address && (
                <span className="text-red-500 font-semibold">
                  {errorMsg.address}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* student list section */}
      <div className="student-list my-4">
        <h2 className="text-center font-bold text-3xl my-3">Students List</h2>
        {fetchedData.length > 0 ? (
          <Table
            head={["Email", "Gender", "Hobbies", "Country", "Address"]}
            row={["uid", "gender", "Hobbies", "cnty", "address"]}
            data={fetchedData}
          />
        ) : (
          <h1 className="text-white text-bold text-xl text-center mt-5">
            No Student Found
          </h1>
        )}
      </div>

      {/* footer */}
      <div className=" w-full text-center p-2 bg-slate-600">
        © 2024 Your Company. All rights reserved.
      </div>
    </div>
  );
};

export default Page;
