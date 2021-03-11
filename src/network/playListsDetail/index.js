import {request} from "@/network/request";

export function getPlayListsByPlayListsId(playListsId) {
  return request({
    url: '/play_lists_by_play_lists_id',
    method: 'get',
    params: {
      'play_lists_id': playListsId,
    }
  });
}

export function getSongsByPlayListsId(playListsId) {
  return request({
    url: '/songs_by_play_lists_id',
    method: 'get',
    params: {
      'play_lists_id': playListsId,
    }
  });
}