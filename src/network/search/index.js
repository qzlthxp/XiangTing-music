import {apiRequest} from "@/network/apiRequest";

export function searchHot() {
  return apiRequest({
    url: '/search/hot',
    method: 'get',
  })
}

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


export function searchMore(obj) {
  return apiRequest({
    url: '/cloudsearch',
    method: 'get',
    params: {
      keywords: obj.keywords,
      type: obj.type,
      limit: 30,
    }
  })
}