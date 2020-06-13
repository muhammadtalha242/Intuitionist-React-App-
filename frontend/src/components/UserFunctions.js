import axios from 'axios'

export const register = newUser => {
    return axios
        .post('/register', {
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log(response.status)
            return response
        })
        .catch(err => {
            console.log(err)
            return err
        })
}

export const login = user => {
    return axios
        .post('/login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            console.log(response.status)
            localStorage.setItem('usertoken', response.data)
            return response
        })
        .catch(err => {
            console.log('error')
            // console.log(err.status)
            return err
        })
}