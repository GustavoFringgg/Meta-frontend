import Swal from 'sweetalert2'

export function useAlert() {
  const showAlert = (title, icon) => {
    return Swal.fire({
      position: 'top',
      title: title,
      icon: icon,
      timer: 500,
      toast: true,
      showConfirmButton: false,
      timerProgressBar: true,
    })
  }
  return {
    showAlert,
  }
}
