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

export function getCateManage() {
  return request({
    url: '/play_lists_cate_manage',
    method: 'get',
  });
}

export function create(obj) {
  return request({
    url: '/create_play_lists',
    method: 'post',
    data: obj,
  });
}

export function delPlayLists(ids) {
  return request({
    url: '/delete_play_lists',
    method: 'post',
    params: {
      ids
    }
  })
}