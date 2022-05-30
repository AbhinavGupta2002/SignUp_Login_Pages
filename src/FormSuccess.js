import React from 'react'

const FormSuccess = () => {
  return (
      <div className='form-content-right'>
          <div className='form-success'>
              We Have Received Your Request
          </div>
          <img src={require('./img/success.png')} alt='success-image' className='form-img-2'></img>
      </div>
  )
}

export default FormSuccess