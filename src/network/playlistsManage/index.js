import { request } from '@/network/request'
import { apiRequest } from '@/network/apiRequest'

export function getAllPlayLists (userId, currentUserId) {
  return request({
    url: '/user_play_lists',
    method: 'post',
    data: {
      user_id: userId,
      current_user_id: currentUserId
    },
  })
}

export function getCateManage () {
  return request({
    url: '/play_lists_cate_manage',
    method: 'get',
  })
}

export function create (obj) {
  return request({
    url: '/create_play_lists',
    method: 'post',
    data: obj,
  })
}

export function upDate (obj) {
  return request({
    url: '/update_play_lists',
    method: 'post',
    data: obj
  })
}

export function delPlayLists (ids) {
  return request({
    url: '/delete_play_lists',
    method: 'post',
    params: {
      ids,
    },
  })
}

export function getSongsInfo (ids) {
  return apiRequest({
    url: '/song/detail',
    method: 'get',
    params: {
      ids,
    },
  })
}

export function deleteSongOfPlayLists (ids, play_lists_id) {
  return request({
    url: '/delete_song_of_play_lists',
    method: 'post',
    data: {
      ids,
      play_lists_id
    }
  })
}