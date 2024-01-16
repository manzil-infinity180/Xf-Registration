const jwt = require("jsonwebtoken");
// creating token using jwt 
const signToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET)
};


const sendCookiesAndToken = async (user,res) =>{
  // taking id of github profile
  console.log(user._id);
  const token = signToken(user._id);
  console.log({token});
  console.log("demo: "+signToken(45555555));
  // storing the token in cookie with the name 'jwt'
  await res.cookie('jwt',token,{
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure : false
  });
 

}
module.exports = sendCookiesAndToken;