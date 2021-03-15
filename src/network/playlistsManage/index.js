import {request} from "@/network/request";

export function getAllPlayLists(id) {
  return request({
    url: '/user_play_lists',
    method: 'get',
    params: {
      user_id: id,
    }
  })
}