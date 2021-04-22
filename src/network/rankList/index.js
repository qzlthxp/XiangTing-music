import { apiRequest } from '@/network/apiRequest'
import { request } from '@/network/request'
export function getTopList() {
  return apiRequest({
    url: '/toplist',
    method: 'get',
  })
}

export function getListDetail(id) {
  return apiRequest({
    url: '/playlist/detail',
    method: 'get',
    params: {
      id,
    },
  })
}

export function getUserRank() {
  return request({
    url: '/song_rank',
    method: 'get',
  })
}
