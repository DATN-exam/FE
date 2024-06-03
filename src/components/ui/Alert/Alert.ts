import Swal, { SweetAlertIcon } from 'sweetalert2'
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
    const result = await MySwal.fire({
      title: title,
      input: 'text',
      inputPlaceholder: inputPlaceholder ?? 'Nhập',
    })
    return result.value
  },
  async inputFile(title: string) {
    const { value: file } = await MySwal.fire({
      title: title,
      input: 'file',
      customClass: {
        container: 'z-[3000]',
      },
      // inputAttributes: {
      //   accept: '.csv',
      //   'aria-label': 'Input your file',
      // },
    })
    return file
  },
  alert(title: string, text: string, icon: SweetAlertIcon | null) {
    MySwal.fire({
      title: title,
      text: text,
      icon: icon ?? 'question',
    })
  },
}

export default Alert
