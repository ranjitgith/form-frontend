"use client";

const baseUrl = "https://form-backend-drab.vercel.app";

export const getUserData = async () => {
  try {
    const response = await fetch(baseUrl + "/std/get-std");
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.log("Error fetching user data", err);
  }
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

export const updateUserData = async (isEdit, data) => {
  try {
    const response = await fetch(baseUrl + `/std/update-std?id=${isEdit}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ data: data }),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.log("Error updating", err);
  }
};

export const deleteUserData = async (isEdit) => {
  try {
    const response = await fetch(baseUrl + `/std/delete-std/${isEdit}`, {
      method: "DELETE",
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.log("Error deleting", err);
  }
};