"use client";

// {uid: 'ranjit ', pwd: 'khan', gender: 'male', Hobbies: 'kho-kho', cnty: 'Pakistan', …}

// Hobbies: "kho-kho";
// address: "laho";
// cnty: "Pakistan";
// gender: "male";
// pwd: "khan";
// uid: "ranjit ";

const validation = (key, value) => {
  if (key === "uid") {
    if (value === "") return "Enter User Id";
    const userIdRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (userIdRegex.test(value)) {
      return "";
    } else {
      return "Invalid User Id";
    }
  }
  if (key === "pwd") {
    if (value === "") return "Enter Password";
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (passwordRegex.test(value)) {
      return "";
    } else {
      return "Invalid Password";
    }
  }
  if (key === "gender") {
    if (value === "") return "Enter Gender";
    else return "";
  }
  if (key === "Hobbies") {
    if (value === "") return "Enter Hobbies";
    else return "";
  }
  if (key === "address") {
    if (value === "") return "Enter Address";
    else return "";
  }
  if (key === "cnty") {
    if (value === "Select" || value === "") return "Enter Country";
    else return "";
  }
};

export default validation;
