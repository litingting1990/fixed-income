import http from '@utils/http';

// 获取机构列表
export async function getOrgList() {
  return http('/basic/org/list', 'GET');
}


