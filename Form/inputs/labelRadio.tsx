import clsx from 'clsx';
import React from 'react';

type Props = {
  formik: any;
  label: any;
  name: any;
  type: any;
  val: any;
  isUserLoading: any;
};

const generateUniqueId = () => {
  // Generate a random number or a unique identifier here
  return `radio_${Math.random().toString(36).substr(2, 9)}`;
};

const LabelRadio: React.FC<Props> = ({ formik, val, label, isUserLoading, name, type }) => {
  const uniqueId = generateUniqueId();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    formik.setFieldValue(name, newValue);
  };

  return (
    <div className="d-flex me-5">
      <div className="form-check form-check-custom form-check-solid form-switch mb-2 d-flex">
        <input
          className={clsx(
            'form-check-input mb-3 mb-lg-0',
            { 'is-invalid': formik.touched.baseFare && formik.errors[name] },
            {
              'is-valid': formik.touched[name] && !formik.errors[name],
            }
          )}
          type={type}
          id={uniqueId}
          name={name}
          value={val}
          disabled={formik.isSubmitting || isUserLoading}
          onChange={handleRadioChange}
          checked={formik.values[name] === val}
        />
        {formik.touched[name] && formik.errors[name] && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors[name]}</span>
            </div>
          </div>
        )}
      </div>
      <label htmlFor={uniqueId} className="form-label ms-3">
        {label}
      </label>
    </div>
  );
};

export default LabelRadio;
