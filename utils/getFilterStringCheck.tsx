export const getFilterStringCheck = (str: string) => {
  try {
    return str?.toLowerCase()?.replace(/[^a-z0-9]+/gi, "");
  } catch (err) {
    return str;
  }
};
