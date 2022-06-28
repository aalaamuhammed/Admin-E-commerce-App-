import instance from "./AxiosInstance";

export async function getCategories() {
  try {
    const response = await instance.get("/category");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
