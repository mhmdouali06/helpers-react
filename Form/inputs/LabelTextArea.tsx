import clsx from 'clsx';
import React from 'react';

type Props = {
  formik: any;
  label?: any;
  name: any;
  ReadOnly?: any;
  isUserLoading: any;
  placeholder?: any;
};

const LabelTextArea: React.FC<Props> = ({
  formik,
  label,
  name,
  isUserLoading,
  placeholder,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="form-label required">
          {label}
        </label>
      )}
      <textarea
      rows={3}
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
        name={name}
        className={clsx(
          'form-control mb-3 mb-lg-0',
          { 'is-invalid': formik.touched[name] && formik.errors[name] },
          { 'is-valid': formik.touched[name] && !formik.errors[name] }
        )}
        autoComplete="off"
        disabled={formik.isSubmitting || isUserLoading}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block">
            <span role="alert">{formik.errors[name]}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabelTextArea;
