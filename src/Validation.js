import Axios from 'axios'

// checks if any errors have been made in the inputs
function hasErrors(errors) {
    if (!!errors.username || !!errors.email || !!errors.password || !!errors.confirm_password) {
        return true
    }
    return false
}

// returns true if username already exists in the database. Else, returns false
function isDuplicate(accounts, myusername) {
    for (let i = 0; i < accounts.data.length; ++i) {
        if (myusername === accounts.data[i].username) {
            return true
        }
    }
    return false
}

// returns true if password associated with an account matches. Else, returns false
function isPasswordMatch(accounts, myusername, mypassword) {
    for (let i = 0; i < accounts.data.length; ++i) {
        if (myusername === accounts.data[i].username) {
            if (mypassword === accounts.data[i].password) {
                return true
            }
            return false
        }
    }
    return false
}

export default function validation(values, pageType) {
    let errors = {}

    // Username
    if (!values.username.trim()) {
        errors.username = 'Username Required'
    }

    // Email
    if (pageType === '/Signup_Login_Pages') {
        if (!values.email) {
            errors.email = 'Email Required'
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email Address Is Invalid'
        }
    }

    // Password
    if (!values.password) {
        errors.password = 'Password Required'
    } else if (values.password.length < 6) {
        errors.password = 'Password Must Be Atleast 6 Characters Long'
    }

    // Confirm Password
    if (pageType === '/Signup_Login_Pages') {
        if (!values.confirm_password) {
            errors.confirm_password = 'Password Required'
        } else if (values.confirm_password != values.password) {
            errors.confirm_password = 'Passwords Do Not Match'
        }
    }

    // push the account to database
    async function postAccount() {
        try {
            const accounts = await Axios.get("http://localhost:4000/all-usernames", {})
            if (!hasErrors(errors)) {
                if (!isDuplicate(accounts, values.username)) {
                    await Axios.post("http://localhost:4000/add-account", {
                        username: values.username,
                        email: values.email,
                        password: values.password
                    })
                } else {
                    throw('ERROR: username is taken!')
                }
            }
            //errors.username = 'TAKEN HERE'
        } catch (error) {
            console.log(error)
        }
    }

    async function getAccount() {
        try {
            const accounts = await Axios.get("/all-login-credentials", {})
            if (!hasErrors(errors)) {
                if (!isDuplicate(accounts, values.username)) {
                    return {'type': 'USERNAME', 'message': 'ERROR: username is not registered!'}
                }
                if (!isPasswordMatch(accounts, values.username, values.password)) {
                    return {'type': 'PASSWORD', 'message': 'ERROR: password is invalid!'}
                }
            }
        } catch (error) {
            console.log(error)
            return {'type': 'DB', 'message': error}
        }
        return {'type': 'PASS', 'message': 'PASS'}
    }

    if (pageType === '/Signup_Login_Pages') {
        postAccount()
    } else {
        const dbError = getAccount()
        dbError.then(result => {
            if (result.type === 'USERNAME') {
                console.log(result.message)
                errors.username = result.message
            } else if (result.type === 'PASSWORD') {
                errors.password = result.message
                console.log(result.message)
            }
        })
    }

    return errors
}