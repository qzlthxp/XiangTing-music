import { request } from '../request.js'

export function getSimilar (userId, songId) {
  return request({
    url: '/similar_songs',
    method: 'get',
    params: {
      user_id: userId,
      song_id: songId
    }
  })
}