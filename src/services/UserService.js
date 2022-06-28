import instance from "./AxiosInstance";
export async function getUser(categoryId) {
  try {
    const response = await instance.get(`/user?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function updateUser(user) {
  try {
    const response = await instance.put(`/user/${user.id}`, {
      ...user,
    });
    console.log({ response });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function DeleteUser(user) {
  try {
    const response = await instance.delete(`/user/${user.id}`);
    console.log({ response });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function AddUser(user) {
  try {
    const response = await instance.post(`/user`, { ...user });
    console.log({ response });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
