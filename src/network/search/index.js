import {apiRequest} from "@/network/apiRequest";

export function searchSingers(keywords) {
  return apiRequest({
    url: '/search',
    method: 'get',
    params: {
      keywords,
      limit: 3,
      type: 100,
    }
  })
}

export function searchSongs(keywords) {
  return apiRequest({
    url: '/search',
    method: 'get',
    params: {
      keywords,
      limit: 3,
      type: 1,
    }
  })
}

export function searchEps(keywords) {
  return apiRequest({
    url: '/search',
    method: 'get',
    params: {
      keywords,
      limit: 3,
      type: 10,
    }
  })
}


