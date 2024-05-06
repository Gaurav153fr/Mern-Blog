const Cfetch = async (id) => {
  try {
    const response = await fetch("/api/post/" + id);
    const json = await response.json();
    if (!response.ok) {
      return json;
    }
    return json
  } catch (err){
    console.log("error",err);
  }
};
export { Cfetch };
