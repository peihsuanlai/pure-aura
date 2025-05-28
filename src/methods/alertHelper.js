import Swal from 'sweetalert2';

export function showSuccessAlert(message = '操作成功', reload = false) {
  Swal.fire({
    title: message,
    icon: 'success',
    timer: 1500,
    showConfirmButton: false,
  }).then(() => {
    if (reload) {
      window.location.reload();
    }
  });
}

export function showErrorAlert(message = '發生錯誤，請稍後再試', reload = true) {
  Swal.fire({
    title: message,
    icon: 'error',
  }).then(() => {
    if (reload) {
      window.location.reload();
    }
  });
}
