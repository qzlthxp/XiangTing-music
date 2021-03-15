import {apiRequest} from "@/network/apiRequest";

export function getTopList() {
  return apiRequest({
    url: '/toplist',
    method: 'get',
  });
}

export function getListDetail(id) {
  return apiRequest({
    url: '/playlist/detail',
    method: 'get',
    params: {
      id
    }
  });
}