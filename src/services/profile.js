import Api from "./api";

export const getProfile = async (fetchHandler) => {
  const result = await Api.call("/profile/", {}, fetchHandler);
  if (!result.error && result.data) {
    return result.data;
  }
  return result;
};

export const changeLanguage = async (lang) => {
  const result = await Api.call("/profile", {
    method: "PUT",
    body: {
      lang,
    },
  });
  return result;
};
