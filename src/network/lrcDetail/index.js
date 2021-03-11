import {apiRequest} from "@/network/apiRequest";

export function getSongDesc(ids) {
  return apiRequest({
    url: '/song/detail',
    method: 'get',
    params: {
      ids
    }
  });
}

export function getLrc (id) {
  return apiRequest({
    url: '/lyric',
    method: 'get',
    params: {
      id
    }
  })
}

export function getSimiSong(id) {
  return apiRequest({
    url: '/simi/song',
    method: 'get',
    params: {
      id
    }
  })
}