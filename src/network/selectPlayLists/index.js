import {request} from "@/network/request";

export function addSong(obj) {
  return request({
    url: '/play_lists_add_song',
    method: 'post',
    params: {
      play_lists_id: obj.play_lists_id,
      songs: obj.ids
    }
  })
}