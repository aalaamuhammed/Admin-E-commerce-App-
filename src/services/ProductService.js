import instance from "./AxiosInstance";
export async function getProduct(categoryId) {
  try {
    const response = await instance.get(`/product?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function updateProduct(product) {
  try {
    const response = await instance.put(`/product/${product.id}`, {
      ...product,
    });
    console.log({ response });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function DeleteProduct(product) {
  try {
    const response = await instance.delete(`/product/${product.id}`);
    console.log({ response });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function AddProduct(product) {
  try {
    const response = await instance.post(`/product`, { ...product });
    console.log({ response });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
