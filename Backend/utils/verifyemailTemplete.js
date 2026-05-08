const verifyEmailTemplete=({name,verifyemailurl})=>{
return `
<div> 
<h1> Dear ${name}</h1>
<p> Thankyou for Registration ,please verify you email by clicking on the link below:</p>
<a href="${verifyemailurl}">Verify Email</a>
</div>
`
}
export default verifyEmailTemplete;