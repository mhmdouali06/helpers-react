import clsx from 'clsx'
import React from 'react'
type Props = {
  formik: any
  label?: any
  type: any
  name: any
  ReadOnly?:any
  isUserLoading: any
  placeholder?: any
  defaultValue?:any
  isRequred?:boolean
}
const LabelInput: React.FC<Props> = ({formik, label, type, isUserLoading, name, placeholder,ReadOnly,defaultValue, isRequred=false}) => {
  return (
    <div>
      {label&&(
        <label htmlFor={name} className={`form-label ${isRequred?"required":""}`}>
        {label}
      </label>
      )}
      <input
      readOnly={ReadOnly?true:false}
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
        type={type}
        step={0.1}
        name={name}
        defaultValue={defaultValue}
        className={clsx(
          'form-control  mb-3 mb-lg-0',
          {'is-invalid': formik.touched[name] && formik.errors[name]},
          {
            'is-valid': formik.touched[name] && !formik.errors[name],
          }
        )}
        autoComplete='off'
        disabled={formik.isSubmitting || isUserLoading}
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

export default LabelInput
