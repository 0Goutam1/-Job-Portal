import {api }from '../../../shared/api'


export async function register({userName,email,password,role,otp}) {
    
    const respones= await api.post('/api/auth/register',{
        
        userName,email,password,role,otp
    })
    return respones.data

}

export async function sendOTP(email) {
    const response = await api.post('/api/auth/send-otp', {
        email
    })
    return response.data
}


export async function login({userName,password}) {
    const respones = await api.post('/api/auth/login',{
      
        userName,password
    })
    return respones.data
    
}

export async function logOut() {
    const respones= await api.post('/api/auth/logOut')
    return respones.data
}

export async function getMe() {
    const respones = await api.get('api/auth/getMe')
    return respones.data
    
}
