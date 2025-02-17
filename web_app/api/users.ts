import { request } from "./apiHelper";

export async function loginUser(data: {
  user: { email: string; password: string };
}) {
  const { status, headers } = await request("POST", "/token", data);

  if (status == 200) {
    const token = headers?.get("Authorization")?.split(" ")[1];
    localStorage.setItem("authToken", token as string);
    return { success: true };
  }

  return {
    success: false,
    error: "Please check your credentials and try again",
  };
}

export async function createUser(data: {
  user: { email: string; password: string };
}) {
  return request("POST", "/v1/users", data);
}
