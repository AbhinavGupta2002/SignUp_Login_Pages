import React, {useState} from 'react'
import useForm from './UseForm';
import validation from './Validation';
import {Link} from 'react-router-dom';
import './Form.css';

// capitlaize first letter of every word in a string
const capitalize = (s) => {
    return s.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}

const inputType = (inputName, values, buttonText, buttonText1) => {
    return (inputName == 'username' ? 'username' : inputName == 'email' ? 'email' :
            inputName == 'password' ? buttonText == 'SHOW' ? 'password' : 'text' :
            buttonText1 == 'SHOW' ? 'password' : 'text')
}

const inputError = (inputName, errors) => {
    return (inputName == 'email' ? errors.email && <p>{errors.email}</p> :
            inputName == 'username' ? errors.username && <p>{errors.username}</p> : 
            inputName == 'password' ? errors.password && <p>{errors.password}</p> :
            errors.confirm_password && <p>{errors.confirm_password}</p>)
}

const inputBar = (inputName, handleChange, values, errors, buttonText, buttonText1) => {
    return (
    <div className='form-inputs'>
        <label htmlFor={inputName} className='form-label'>
            {capitalize(inputName.replaceAll('_', ' '))}
        </label>
        {inputError(inputName, errors)}
        <input id={inputName} type={inputType(inputName, values, buttonText, buttonText1)} name={inputName} className='form-input' 
                placeholder={'Enter your ' + (inputName.includes('password') ? 'password' : inputName)}
                value={values.inputName} onChange={handleChange}/>
    </div>
    )
}

const FormSignUp = ({submitForm}) => {
    document.title = "Signup Form"
    const {handleChange, values, handleSubmit, errors} = useForm(submitForm, validation)
    const [buttonText, setButtonText] = useState('SHOW')
    const [buttonText1, setButtonText1] = useState('SHOW')

    

    function handlePasswordView(passwordType) {
        if (passwordType == '1') {
            buttonText == 'HIDE' ? setButtonText('SHOW') : setButtonText('HIDE')
        } else {
            buttonText1 == 'HIDE' ? setButtonText1('SHOW') : setButtonText1('HIDE')
        }
    }

  return (
      <div className='form-content-right'> 
        <form className='form' onSubmit={handleSubmit}>
            <h1 style={{ fontSize: '160%', textAlign: 'center'}}>Sign Up Form</h1>
            {inputBar('username', handleChange, values, errors, buttonText, buttonText1)}
            {inputBar('email', handleChange, values, errors, buttonText, buttonText1)}
            {inputBar('password', handleChange, values, errors, buttonText, buttonText1)}
            <button type='button' className='password-button-1' onClick={() => handlePasswordView('1')}>
                {buttonText}
            </button>
            {inputBar('confirm_password', handleChange, values, errors, buttonText, buttonText1)}
            <button type='button' className='password-button-2' onClick={() => handlePasswordView('2')}>
                {buttonText1}
            </button>
            <button className='form-input-btn' type='submit'>Sign Up</button>
            <span className='form-input-login'>Already Have An Account? <Link to='/Signup_Login_Pages/login'>Login</Link></span>
        </form>
      </div>
  )
}

export default FormSignUp