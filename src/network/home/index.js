import {apiRequest} from "@/network/apiRequest";
export function banner() {
  return apiRequest({
    url: '/banner',
    method: 'get'
  });
}