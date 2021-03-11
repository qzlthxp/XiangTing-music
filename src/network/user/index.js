import {request} from "@/network/request";

export function getUserInfo(userId) {
  return request({
    url: '/user_info_by_id',
    method: 'get',
    params: {
      'user_id': userId
    }
  });
}

export function getUserLikeSinger(userId) {
  return request({
    url: '/singer_is_user_like',
    method: 'get',
    params: {
      'user_id': userId,
    }
  });
}

export function getUserLikeSong(userId) {
  return request({
    url: '/songs_is_user_like',
    method: 'get',
    params: {
      'user_id': userId,
    }
  });
}

export function getUserLikePlayLists(userId) {
  return request({
    url: '/play_lists_is_user_like',
    method: 'get',
    params: {
      'user_id': userId,
    }
  });
}

export function updateUserLikeSong(userId, songs) {
  return request({
    url: '/update_user_like_song',
    method: 'post',
    data: {
      'user_id': userId,
      'user_like_song': songs
    }
  });
}

export function updateRemoveUserLikeSong(userId, songId) {
  return request({
    url: '/remove_user_like_song',
    method: 'post',
    data: {
      'user_id': userId,
      'song_id': songId
    }
  });
}

export function updateUserLikeSinger(userId, singers) {
  return request({
    url: '/update_user_like_singer',
    method: 'post',
    data: {
      'user_id': userId,
      'user_like_singer': singers
    }
  });
}

export function updateRemoveUserLikeSinger(userId, singerId) {
  return request({
    url: '/remove_user_like_singer',
    method: 'post',
    data: {
      'user_id': userId,
      'singer_id': singerId
    }
  });
}

export function updateUserLikePlayLists(userId, playLists) {
  return request({
    url: '/update_user_like_play_lists',
    method: 'post',
    data: {
      'user_id': userId,
      'user_like_play_lists': playLists
    }
  });
}

export function updateRemoveUserLikePlayLists(userId, playListsId) {
  return request({
    url: '/remove_user_like_play_lists',
    method: 'post',
    data: {
      'user_id': userId,
      'play_lists_id': playListsId
    }
  });
}

export function getAllUserInfo(userId) {
  return request({
    url: '/user_allInfo_by_id',
    method: 'get',
    params: {
      'user_id': userId
    }
  });
}

export function updateAlUserInfo(payload) {
  return request({
    url: '/update_user_allInfo',
    method: 'post',
    data: {
      'user_id': payload.user_id,
      'user_name': payload.user_name,
      'user_phone': payload.user_phone,
      'user_qming': payload.user_qming,
      'user_photo': payload.user_photo,
    }
  });
}
