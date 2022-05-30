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
        if (myusername == accounts.data[i].username) {
            return true;
        }
    }
    return false;
}

export default function validation(values) {
    let errors = {}

    // Username
    if (!values.username.trim()) {
        errors.username = 'Username Required'
    }

    // Email
    if (!values.email) {
        errors.email = 'Email Required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email Address Is Invalid'
    }

    // Password
    if (!values.password) {
        errors.password = 'Password Required'
    } else if (values.password.length < 6) {
        errors.password = 'Password Must Be Atleast 6 Characters Long'
    }

    // Confirm Password
    if (!values.confirm_password) {
        errors.confirm_password = 'Password Required'
    } else if (values.confirm_password != values.password) {
        errors.confirm_password = 'Passwords Do Not Match'
    }

    // push the account to database
    async function postAccount() {
        try {
            let accounts = await Axios.get("http://localhost:4000/all-usernames", {})
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
            errors.username = 'TAKEN HERE'
        } catch (error) {
            console.log(error)
        }
    }

    postAccount()
    
    return errors
}