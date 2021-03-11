import {apiRequest} from "@/network/apiRequest";

export function getSingerDetail(id) {
  return apiRequest({
    url: '/artist/detail',
    method: 'get',
    params: {
      id,
    }
  });
}

export function getSimiSinger(id) {
  return apiRequest({
    url: '/simi/artist',
    method: 'get',
    params: {
      id
    }
  })
}








