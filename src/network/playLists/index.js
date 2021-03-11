import {request} from "@/network/request";

export function getCate() {
  return request({
    url: '/play_lists_cate',
    method: 'get',
  });
}

export function getHotPlayLists() {
  return request({
    url: '/hot_play_lists',
    method: 'get',
  });
}

export function getPlayLists(playListsDetailId) {
  return request({
    url: '/play_lists_by_detail_cate_id',
    method: 'get',
    params: {
      play_lists_detail_cate_id: playListsDetailId
    }
  })
}