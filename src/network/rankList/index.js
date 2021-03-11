import {apiRequest} from "@/network/apiRequest";

export function getTopList() {
  return apiRequest({
    url: '/toplist',
    method: 'get',
  });
}