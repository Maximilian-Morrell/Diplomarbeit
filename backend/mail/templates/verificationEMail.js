export default function verificationEMail(user) {
    
    return `
    <h1>Welcome ${user.firstName}!</h1>
    <p>This E-Mail confirms the account registration!</p>
    
    <h4>Here are the account details: </h4>
    <span>First name: ${user.firstName}</span><br>
    <span>Last name: ${user.lastName}</span><br>
    <span>Birthday: ${String(user.birthDay.getDate()).padStart(2, "0")}.${String(user.birthDay.getMonth() + 1).padStart(2, "0")}.${user.birthDay.getFullYear()}</span><br>
    <span>Username: ${user.username}</span>
    `
}