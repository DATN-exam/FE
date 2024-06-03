const dataURLToBlob = (dataURL: string) => {
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

const handelInputImage = (cb: any) => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')

  input.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')!
          const maxWidthOrHeight = 360
          let newWidth = img.width
          let newHeight = img.height
          if (img.width > maxWidthOrHeight || img.height > maxWidthOrHeight) {
            if (img.width > img.height) {
              newWidth = maxWidthOrHeight
              newHeight = (img.height * maxWidthOrHeight) / img.width
            } else {
              newHeight = maxWidthOrHeight
              newWidth = (img.width * maxWidthOrHeight) / img.height
            }
          }
          canvas.width = newWidth
          canvas.height = newHeight
          ctx.drawImage(img, 0, 0, newWidth, newHeight)
          const resizedDataURL = canvas.toDataURL('image/jpeg')
          const blob = dataURLToBlob(resizedDataURL)
          const id = 'blobid' + new Date().getTime()
          const blobCache = tinymce.activeEditor?.editorUpload.blobCache
          const blobInfo = blobCache?.create(id, blob, resizedDataURL)
          if (blobInfo) {
            blobCache?.add(blobInfo)
            cb(blobInfo.blobUri(), { title: file.name })
          }
        }
        img.src = reader.result as string
      })
      reader.readAsDataURL(file)
    }
  })

  input.click()
}

export const plugins = `preview searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table charmap nonbreaking insertdatetime advlist lists charmap quickbars emoticons`

export const toolbar = `preview image link | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  save | insertfile media codesample | ltr rtl`

export const handleFileInput = (props: any) => {
  const { meta, cb } = props
  if (meta.filetype === 'image') {
    handelInputImage(cb)
  }
}
