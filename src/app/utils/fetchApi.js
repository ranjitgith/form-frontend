"use client";

const baseUrl = "https://form-backend-drab.vercel.app";
export const getUserData = async () => {
  const response = await fetch(baseUrl + "/std/get-std");
  const jsonData = await response.json();
  return jsonData;
};

export const postUserData = async (data) => {
  try {
    const response = await fetch(baseUrl + "/std/create-std", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ data: data }),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.log("Error registering", err);
  }
};
