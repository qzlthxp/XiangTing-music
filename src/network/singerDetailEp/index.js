import {apiRequest} from "@/network/apiRequest";

export function getAllEp(id) {
  return apiRequest({
    url: '/artist/album',
    method: 'get',
    params: {
      id
    }
  });
}