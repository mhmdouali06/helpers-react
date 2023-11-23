import {Box, Button} from '@mui/material'
import clsx from 'clsx'
type Props = {
  formik: any
  label: any
  name: any
  isUserLoading: any
}
const LabelFilePreview: React.FC<Props> = ({formik, label, isUserLoading, name}) => {
  return (
    <>
      <label htmlFor={name} className='form-label required'>
        {label}
      </label>{' '}
      <input
        className={clsx(
          'form-check-input  mb-3 mb-lg-0',
          {'is-invalid': formik.touched.baseFare && formik.errors[name]},
          {
            'is-valid': formik.touched[name] && !formik.errors[name],
          }
        )}
        accept='image/*'
        type='file'
        id={`select-image-${name}`}
        style={{display: 'none'}}
        onChange={(event) => {
          if (event) {
            formik.setFieldValue([name], event?.target?.files?.[0])
          }
        }}
        disabled={formik.isSubmitting || isUserLoading}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik.errors[name]}</span>
          </div>
        </div>
      )}
      <label htmlFor={`select-image-${name}`}>
        <Button variant='contained' color='primary' component='span'>
          Upload Image
        </Button>
      </label>

      <div className='ms-3 mt-3  shadow p-2 rounded border border-1 w-150px h-150px' >
        {formik.values[name] ? (
            <img src={URL.createObjectURL(formik.values[name])} className='w-100 h-100 rounded' />
        ):(
          <></>
        )}
      </div>
    </>
  )
}

export default LabelFilePreview
