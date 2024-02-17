# Xf-Registration

 # INTRO
 
 * User can getRegistered and will get notification on their email id
   ```
    subject : 'Xf Registration Successfully Done 🦾',
    message : 'Thank You for Xf registration,you can know explore the Xf',
   ```
* User can search the other person via their top skills , username, postal code ,college name and also can find person in range by mentioning the <b> radius,latitude and longitude </b>
* Having the feature to update their <b> phone number </b> , <b>username</b> and also their <b>profile photo</b> and <b>background image</b> too , we are not storing the image in database we simply storing in our diskStorage thanks to <b> multer package </b> that help to do so.
* Register,update your details,delete your account,update your phone number,update profile photo & background image , search other person 


<b>Documentation</b> - https://documenter.getpostman.com/view/27140962/2s9YeD8D4V

# Run Locally 
```
Install these all dependencies
"crypto-js": "^4.2.0",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.2.0",
    "mongoose": "^7.6.3",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.7",
    "nodemon": "^3.0.1",
    "passport": "^0.6.0",
    "passport-github": "^1.1.0",
    "passport-google-oauth": "^2.0.0",
    "passport-google-oauth20": "^2.0.0",
    "validate": "^5.2.0",
    "validator": "^13.11.0"
```
```
Here all the dependencies in one goo
Delete the package.json and package-lock.json
Do the following commands -
Setup the config.env file with our own credientials (ref config_example)
```
```
npm install
```

```
npm i express nodemailer nodemon passport passport-github validate validator express express-session jsonwebtoken mongodb mongoose multer passport-google-oauth crypto-js
```

# Github OAuth 
<div style="text-align: center;">

 <img width="840" style="center" alt="Screenshot 2023-11-24 at 11 27 40 PM" src="https://github.com/manzil-infinity180/Xf-Registration/assets/119070053/24d34cd0-34d9-46fb-b1e2-dacce1e6e74e">
<img width="840" style="center" alt="Screenshot 2023-11-24 at 11 28 01 PM" src="https://github.com/manzil-infinity180/Xf-Registration/assets/119070053/f2050239-973a-4e42-90e3-6a0547732603">
</div>

# Register 
<img width="750" alt="Screenshot 2023-11-24 at 11 54 21 PM" src="https://github.com/manzil-infinity180/Xf-Registration/assets/119070053/a769fe0c-e49d-4285-8cc0-c51e43f369c8">

# User
<img width="786" alt="Screenshot 2023-11-24 at 11 53 58 PM" src="https://github.com/manzil-infinity180/Xf-Registration/assets/119070053/7b1fc6e3-829f-49cb-8377-41bdb430844a">


