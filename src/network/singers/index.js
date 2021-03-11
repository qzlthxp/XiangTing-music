import {apiRequest} from "@/network/apiRequest";


export function getSingers(obj) {
  return apiRequest({
    url: '/artist/list',
    method: 'get',
    params: {
      initial: obj.initial,
      type: obj.type,
      area: obj.area
    }
  })
}