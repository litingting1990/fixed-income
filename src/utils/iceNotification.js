import { Message } from '@alifd/next';

export function success(title) {
  Message.show({
    type: 'success',
    hasMask: true,
    size: 'large',
    title
  });

}