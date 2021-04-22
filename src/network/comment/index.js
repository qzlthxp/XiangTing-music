import { request } from '@/network/request'

export function getAllComments(obj) {
  return request({
    url: 'all_comments',
    params: {
      ...obj,
    },
  })
}

export function create(obj) {
  return request({
    url: 'create_comment',
    method: 'post',
    data: {
      ...obj,
    },
  })
}

export function remove(obj) {
  return request({
    url: 'remove_comment',
    method: 'post',
    data: {
      ...obj,
    },
  })
}
