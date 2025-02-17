import { removeUndefinedKeysFromFilter } from "@/utils/filterHelper";
import { request } from "./apiHelper";

export const getTodos = async (params: any) => {
  const formattedParams = removeUndefinedKeysFromFilter(params);
  return request("GET", "/v1/todos", null, formattedParams);
};

export const createTodo = async (data: any) => {
  return request("POST", "/v1/todos", data);
};

export const updateTodo = async (slug: string, data: any) => {
  return request("PATCH", `/v1/todos/${slug}`, data);
};

export const deleteTodo = async (slug: string) => {
  return request("DELETE", `/v1/todos/${slug}`);
};
