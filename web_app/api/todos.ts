import { request } from "./apiHelper";

export const getTodos = async (params: any) => {
  return request("GET", "/v1/todos", null, params);
};

export const createTodo = async (data: any) => {
  return request("POST", "/v1/todos", data);
};
