#public-ecommerce-api  

## how to use

## Base URL
http://13.58.233.79:3001/api/v1/

## 1. auth api 

### for register 

method __post__ parameters 
1. name _string_
2. email _string must be in email format_
3. password _string_

>http://13.58.233.79:3001/api/v1/auth/register
 ```
{
    "success": true,
    "data": {
        "id": 9,
        "name": "df",
        "email": "asd@sdf.sdf",
        "image": "default_user_image.png",
        "imageThumb": "default_user_image.png",
        "isEmailVerified": 0,
        "createdAt": 1616676168079,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjE2Njc2Njc3LCJleHAiOjE2MzIyMjg2Nzd9.L8dC9mSA5ExrU_G3WMvLFXUGrrbAKtPCfmSbLph8vHg"
    }
}
 ```

---

### for login 

method __post__ parameters 

1. email _string must be in email format_
2. password _string_

>http://13.58.233.79:3001/api/v1/auth/login
 ```
{
    "success": true,
    "data": {
        "id": 9,
        "name": "df",
        "email": "asd@sdf.sdf",
        "image": "default_user_image.png",
        "imageThumb": "default_user_image.png",
        "isEmailVerified": 0,
        "createdAt": 1616676168079,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjE2Njc2Njc3LCJleHAiOjE2MzIyMjg2Nzd9.L8dC9mSA5ExrU_G3WMvLFXUGrrbAKtPCfmSbLph8vHg"
    }
}
 ```
---

> note all api then required auth token to work if not provided this is the response

you have to pass the authorization Key in headers  __note Bearer pass just the token__
   
* flutter dio example 
```
_dio.options.headers = {
'authorization': eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaW
}; 
```
 * response if not provided
```
{
    "success": false,
    "data": "No auth provided !"
}
```

## 2.  users data
 
* for All users limited to 20 after the last id u will send in last param which is 0 mean get first 20 users start from 0 
* to get the next 20 users u have to past the last user id from your list of users replace it with the 0 value  

method __get__ params 

1. /0    _int last user data if first request pass 0_
 

>http://13.58.233.79:3001/api/v1/users/all/0

---

 ```
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "name",
            "email": "sdfdfdsfd",
            "image": "default_user_image.png",
            "imageThumb": "default_user_image.png",
            "isEmailVerified": 0,
            "createdAt": 1616672963591
        },
    ]
}
 ```

---

