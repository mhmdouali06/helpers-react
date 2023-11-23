import clsx from 'clsx'
import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

type Props = {
  formik?: any
  name: any
  modules?: any
}

const QuilleModule: React.FC<Props> = ({formik, name, modules}) => {
  const handleQuillChange = (value) => {
    // Update Formik field value
    formik.setFieldValue(name, value)
  }
  return (
    <div>
      <ReactQuill
        key={name}
        className={clsx(
          'react-quill-editor',
          {'is-invalid': formik.touched[name] && formik.errors[name]},
          {
            'is-valid': formik.touched[name] && !formik.errors[name],
          }
        )}
        theme='snow'
        value={formik.values[name]} // Set the value to the Formik field's value
        onChange={handleQuillChange}
        modules={modules}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik.errors[name]}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuilleModule
