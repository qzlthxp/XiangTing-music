import {apiRequest} from "@/network/apiRequest";

export function getEp(id) {
  return apiRequest({
    url: '/album',
    method: 'get',
    params: {
      id
    }
  })
}