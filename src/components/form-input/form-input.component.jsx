import './form-imput.styles.scss'

const FormImput = ({ label, ...otherProps }) => {
  
  return (
    <div className='group' >
      <input className='form-input' {...otherProps} />
      {label && (
        <label className={`${otherProps.value.lenght ? 'shrink' : ''} form-input-label`} >{label}</label>
      )}

    </div>
  )
}

export default FormImput