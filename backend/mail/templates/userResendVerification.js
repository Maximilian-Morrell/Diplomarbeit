export default function userEmailUpdate(user, token) {
    
    return `
    <h1>Hello ${user.firstName}!</h1>
    <p>Here is your new verification Link!</p>
    

    <a href=${process.env.FRONTEND_URL}/api/verify-email?token=${token}<h4>Click here to verify your new E-Mail</h4></a>
    <p>This link is valid for 30 Minutes!</p>
    `
}