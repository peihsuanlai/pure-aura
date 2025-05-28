import emitter from './emitter';

export function showSuccessToast(title = '更新') {
  emitter.emit('push-message', {
    style: 'success',
    title: `${title}成功`,
  });
}

export function showErrorToast(err, title = '更新') {
  const message = typeof err.response.data.message === 'string' ? [err.response.data.message] : err.response.data.message;
  emitter.emit('push-message', {
    style: 'danger',
    title: `${title}失敗`,
    content: message.join('、'),
  });
}
