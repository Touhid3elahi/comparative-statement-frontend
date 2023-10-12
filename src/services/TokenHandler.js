const ID_TOKEN_KEY = "api_token";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(ID_TOKEN_KEY);
  }
};

export const getData = () => {
  if (typeof window !== "undefined") {
    const userDataString = window.localStorage.getItem("user_data");
    return JSON.parse(userDataString); // Parse the JSON string to an object
  }
};

export const saveToken = (token) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
  }
};

export const saveData = (data) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("user_data", data);
  }
};

export const destroyToken = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(ID_TOKEN_KEY);
    window.localStorage.removeItem("user_data");
    window.localStorage.removeItem("otp_time");
  }
};
