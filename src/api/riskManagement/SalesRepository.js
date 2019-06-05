import http from '@utils/http';

// 获取机构列表
export async function getOrgList() {
  return http('/basic/org/list', 'GET');
}

// 获取用户列表
export async function getUserList() {
  return http('/basic/user/list', 'GET');
}

// 获取销售对手库列列表
export async function getList() {
  return http('/riskopponentdepository/opponentdepository/list', 'GET');
}

// 入库
export async function addData(params) {
  return http('/riskopponentdepository/put', 'POST', params);
}

// 销售对手库出库操作
export async function deleteData(params) {
  return http('/riskopponentdepository/out', 'POST', params);
}

// 销售对手库调整操作
export async function updateData(params) {
  return http('/riskopponentdepository/adjustment', 'POST', params);
}


