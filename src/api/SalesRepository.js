import http from './http';


export async function getList(params) {
  return http('/eye/cpt/server/find', 'GET', params);
}

export async function updateData(params) {
  return http('/eye/cpt/server/update', 'POST', params);
}

export async function addData(params) {
  return http('/eye/cpt/server/add', 'POST', params);
}

export async function deleteData(params) {
  return http(`/eye/cpt/server/delete/${params}`, 'delete');
}

export async function downloadData(params) {
  return http('/eye/cpt/server/excel', 'GET', params, { responseType: 'blob' });
}

export async function uploadData(params) {
  return http('/eye/cpt/server/excel/import', 'POST', params, { headers: { 'Content-Type': 'multipart/form-data' } });
}

export async function deleteBatch(params) {
  return http(`/eye/cpt/server/delete/batch?ids=${params}`, 'delete');
}
