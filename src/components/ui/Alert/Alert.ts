import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Alert = {
  async confirm(title: string, confirmText?: string, cancelText?: string) {
    const result = await MySwal.fire({
      title: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmText ?? 'Xác nhận',
      cancelButtonText: cancelText ?? 'Hủy',
    })
    return result.isConfirmed
  },
  async inputText(title: string, inputPlaceholder?: string) {
    const result = await Swal.fire({
      title: title,
      input: 'text',
      inputPlaceholder: inputPlaceholder ?? 'Nhập',
    })
    return result.value
  },
}

export default Alert
