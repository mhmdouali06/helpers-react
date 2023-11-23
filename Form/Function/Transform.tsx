import React, {useState, useRef} from 'react'

export function Transform() {
  const [htmlInputs, setHtmlInputs] = useState(['', ''])
  const [htmlOutputs, setHtmlOutputs] = useState(['', ''])
  const transformedJsxRef = useRef<any>(null)

  const parseHtmlToReactComponents = (htmlString) => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlString, 'text/html')

      const formGroups = Array.from(doc.querySelectorAll('.form-group'))

      const jsxCode = formGroups.map((formGroup, index) => {
        const labelElement: any = formGroup.querySelector('label')
        const select = formGroup.querySelector('select')
        const input = formGroup.querySelector('input')

        if (!labelElement || (!select && !input)) {
          console.error('Missing label, select, or input in form group:', formGroup)
          return null
        }

        const label = labelElement.textContent.trim()

        if (select) {
          const selectName = select.getAttribute('name')
          const options = Array.from(select.querySelectorAll('option')).map((option: any) => {
            const optionValue = option.getAttribute('value')
            const optionLabel = option.textContent.trim()

            return `{label: '${optionLabel}', value: '${optionValue}'}`
          })

          return `
            <div className='row mb-4'>
            <label htmlFor={'${selectName}'} className='required form-label'>
            ${label}
          </label>              <SearchSelect
                options={[
                  ${options.join(',\n')}
                ]}
                name={'${selectName}'}
                formik={formik}
              />
            </div>
          `
        } else if (input) {
          const inputType = input.getAttribute('type')
          const inputName = input.getAttribute('name')
          const inputValue = input.getAttribute('value')

          return `
            <div className='row mb-4'>
              <LabelInput label={"${label}"} type={'${inputType}'} name={'${inputName}'} formik={formik} isUserLoading={isUserLoading} />
            </div>
          `
        }

        return null
      })

      return jsxCode
    } catch (error) {
      console.error('Error parsing HTML:', error)
      return []
    }
  }

  const handleTransformClick = () => {
    const transformedJsxCodes = htmlInputs.map(parseHtmlToReactComponents)
    const transformedJsxStrings = transformedJsxCodes.map((code) => code.join('\n'))
    setHtmlOutputs(transformedJsxStrings)
  }

  const handleCopyClick = () => {
    if (transformedJsxRef.current) {
      transformedJsxRef.current.select()
      document.execCommand('copy')
    }
  }

  return (
    <div className='mb-4'>
      {htmlInputs.map((htmlInput, index) => (
        <div key={index} className='w-100'>
          <label htmlFor={`htmlInput${index + 1}`} className='form-label'>
            HTML Input {index + 1}
          </label>
          <textarea
            className='w-100 form-control'
            name={`htmlInput${index + 1}`}
            id={`htmlInput${index + 1}`}
            rows={5}
            value={htmlInput}
            onChange={(e) => {
              const newHtmlInputs = [...htmlInputs]
              newHtmlInputs[index] = e.target.value
              setHtmlInputs(newHtmlInputs)
            }}
          ></textarea>
        </div>
      ))}
      <div className='mt-4'>
        <label htmlFor='htmlOutputs' className='form-label'>
          JSX Output
        </label>
        <div className='d-flex'>
          <textarea
            className='w-100 form-control'
            name='htmlOutputs'
            id='htmlOutputs'
            rows={5}
            value={htmlOutputs.join('\n\n')}
            readOnly
            ref={transformedJsxRef}
          ></textarea>
        </div>
      </div>
      <div className='mt-2'>
        <button className='btn btn-success' onClick={handleTransformClick}>
          Transform
        </button>
        <button className='btn btn-primary m-2' onClick={handleCopyClick}>
          Copy
        </button>
      </div>
    </div>
  )
}
