import { appConfig } from '@/config/app'
import { Editor } from '@tinymce/tinymce-react'
import { handleFileInput, plugins, toolbar } from './config'

const TextEditor = (props: any) => {
  const { question, setQuestion } = props
  return (
    <Editor
      onEditorChange={e => {
        setQuestion(e)
      }}
      apiKey={appConfig.tiny.key}
      value={question}
      init={{
        plugins: plugins,
        imagetools_cors_hosts: ['picsum.photos'],
        menubar: 'edit view insert format tools table',
        toolbar: toolbar,
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        importcss_append: true,
        file_picker_types: 'image media',
        file_picker_callback: (cb, value, meta) => handleFileInput({ cb, value, meta }),
        image_caption: true,
        quickbars_selection_toolbar:
          'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image table',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        language: 'vi',
        className: 'h-fit',
        fontsize_formats: '8px 10px 12px 14px 18px 24px',
      }}
    />
  )
}

export default TextEditor
