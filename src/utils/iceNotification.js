import { Message } from '@alifd/next';

export function success(type) {
  switch (type) {
    case 'add':
      Message.show({
        type: 'success',
        hasMask: true,
        size: 'large',
        title: '添加数据成功'
      });
      break;
    case 'update':
      Message.show({
        type: 'success',
        hasMask: true,
        size: 'large',
        title: '更新数据成功'
      });
      break;
    case 'delete':
      Message.show({
        type: 'success',
        hasMask: true,
        size: 'large',
        title: '删除数据成功'
      });
      break;
    case 'download':
      Message.show({
        type: 'success',
        hasMask: true,
        size: 'large',
        title: '模板导出成功'
      });
      break;
    case 'upload':
      Message.show({
        type: 'success',
        hasMask: true,
        size: 'large',
        title: '文件上传成功'
      });
      break;
    default:
      Message.show({
        type: 'success',
        hasMask: true,
        size: 'large',
        title: '操作数据成功'
      });
  }

}