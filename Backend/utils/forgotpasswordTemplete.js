const forgetpasswordTemplete=({otp,name})=>{
return `
<div>
<p> dear ${name}</p>
<p> your otp for forget password is:</p>
<div>
<p>${otp}</p>
<div/>
<p>this otp is valid for one 1 hour ,put htis otp to reset your password</p>
<br/>
<p>Thankyou </p>
<p>Ecommerce</p>
<div/>
`
}
export default forgetpasswordTemplete;