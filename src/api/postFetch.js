export const postFetch = async (url, options) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
