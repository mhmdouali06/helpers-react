import clsx from 'clsx';
import React from 'react';

type Props = {
  formik: any,
  label: any,
  name: string, // Change the type to string for the field name
  type: string, // Change the type to string for the input type
  isUserLoading: boolean, // Change the type to boolean
  flex?: boolean,
};

const LabelSwitch: React.FC<Props> = ({ formik, label, isUserLoading, name, type, flex }) => {
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name, e.target.checked); // Update Formik field value with a boolean
  };

  return (
    <div className={flex ? 'd-flex flex-row-reverse flex-start align-items-center' : ''}>
      <label htmlFor={name} className="form-label ms-3">
        {label}
      </label>
      <div className="form-check form-check-custom form-check-solid form-switch mb-2 d-flex">
        <input
          className={clsx(
            'form-check-input mb-3 mb-lg-0',
            { 'is-invalid': formik.touched.baseFare && formik.errors[name] },
            { 'is-valid': formik.touched[name] && !formik.errors[name] }
          )}
          onChange={handleSwitchChange} // Use the new handler
          type={type}
          id={name}
          name={name}
          disabled={formik.isSubmitting || isUserLoading}
          checked={formik.values[name]} // Bind the checked state to Formik field value
        />
        {formik.touched[name] && formik.errors[name] && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors[name]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default LabelSwitch;
