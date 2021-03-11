import {apiRequest} from "@/network/apiRequest";

export function getSingerHotSong(id) {
  return apiRequest({
    url: '/artist/top/song',
    method: 'get',
    params: {
      id
    }
  })
}
