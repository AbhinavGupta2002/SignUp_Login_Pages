import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom'

const useForm = (callback, validation) => {
    const location = useLocation()
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const[errors, setErrors] = useState({})
    const[isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values, [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setErrors(validation(values, location.pathname))
        setIsSubmitting(true)
    }

    useEffect(() => {
        if (Object.keys(errors).length == 0 && isSubmitting) {
            callback()
        }
    }, [errors])

    return {handleChange, values, handleSubmit, errors}
}

export default useForm