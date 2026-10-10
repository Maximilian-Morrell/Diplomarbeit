export default function userEmailUpdate(user, token, oldAddress) {
    
    return `
    <h1>Hello ${user.firstName}, you just updated your e-mail address!</h1>
    <p>This E-Mail is the last step of updating your e-mail address!</p>
    
    <h4>You changed: </h4>
    <span>Old E-Mail: ${oldAddress}</span><br>
    <span>New E-Mail: ${user.email}</span><br>

    <a href=${process.env.FRONTEND_URL}/api/verify-email?token=${token}<h4>Click here to verify your new E-Mail</h4></a>
    <p>This link is valid for 30 Minutes!</p>
    `
}