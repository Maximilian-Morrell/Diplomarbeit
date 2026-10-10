export default function userDatUpdateEmail(user) {
    
    return `
    <h1>Hello ${user.firstName}, you just updated your account details!</h1>
    <p>This E-Mail confirms the successful update of your account details!</p>
    
    <h4>Here are the new account details: </h4>
    <span>First name: ${user.firstName}</span><br>
    <span>Last name: ${user.lastName}</span><br>
    <span>Birthday: ${String(user.birthDay.getDate()).padStart(2, "0")}.${String(user.birthDay.getMonth() + 1).padStart(2, "0")}.${user.birthDay.getFullYear()}</span><br>
    <span>Username: ${user.username}</span><br>
    <span>Bio: ${user.bio}</span>
    `
}