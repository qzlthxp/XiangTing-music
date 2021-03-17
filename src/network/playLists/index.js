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

export function addOne(obj) {
  return request({
    url: '/play_lists_add_song_one',
    method: 'post',
    params: {
      song_id: obj.song_id,
      play_lists_id: obj.play_lists_id,
    }
  });
}

export function addMany(obj) {
  return request({
    url: '/play_lists_add_song_many',
    method: 'post',
    params: {
      songs: obj.songs,
      play_lists_id: obj.play_lists_id,
    }
  });
}