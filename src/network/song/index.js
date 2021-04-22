import { request } from '../request'

export function addPlayNumber(ids) {
  return request({
    url: '/add_play_number',
    method: 'post',
    data: {
      ids,
    },
  })
}
