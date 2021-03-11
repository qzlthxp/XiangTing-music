import {apiRequest} from "@/network/apiRequest";

export function getSongs(id) {
  return apiRequest({
    url: '/artists',
    method: 'get',
    params: {
      id
    }
  });
}