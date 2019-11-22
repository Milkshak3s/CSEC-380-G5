# Activity 3

[Link to tests] (https://github.com/Milkshak3s/CSEC-380-G5/tree/master/tests "Test cases")

### 1. How do you ensure that users that navigate to the protected pages cannot bypass authentication requirements?

Validation of the sessionID, or a token upon visiting the web application is a good way to ensure the users to navigate to protected pages. For example, in Group 5’s code base, we have implemented the checking of authentication token, in the frontend and in the backend. In the front end, the application checks for the authentication token, and if it's undefined, the application redirects the user back to the AppLogin endpoint. 

**Frontend**
```    
  return (
      <React.Fragment>
        {(typeof auth_token == "undefined") ? <AppLogin /> : <AppMain />}
      </React.Fragment>
    );
```

In the backend, all of the api routes will check for the user authentication token in order to protect the pages from authentication requirement bypass. 

**Backend - app.py @app.route('/api/v1/videos/upload', methods=['POST'])**
```
    # user checking
    matching_user = check_token_user(token)
    if matching_user is None:
        return jsonify({'error': 'Invalid token'})
```

**Backend - app.py @app.route('/api/v1/token', methods=['POST'])**
```
    else:
        matching_user = check_token_user(request_data.get('token'))
        if matching_user is None:
            return jsonify({'error': 'Invalid token'})
```

### 2. How do you protect against session fixation?

It is crucial to know who sessions are getting hijacking before knowing how to protect against it. Attackers can enumerate session information and possibly hijack it through these following methods. 

* **Sniffing traffic:** If an attacker is within the same network of the victim can sniff the traffic. Then, attacker will be able to view the cookie, which is used for storing sessionID or tokens. 

* **Client-side Javascript:** Using attacks like Reflected XSS, the attacker could leverage client-side javascript to send document.cookie to the attacker’s cookie-stealing web server. 

In order to protect against these, three methods are widely used. 

* **Implementation of HTTPS:** Because HTTP does not have traffic encryption, attackers were able to sniff the plaintext version of the cookie. Thus, implementing HTTPS and encrypting all traffic between the server/client will protect against such sniffing.

* **Implementation of HttpOnly flag:** With the HttpOnly flag, the cookie cannot be read by javascript code. The cookie can be only read through a valid Http request. With the flag, the browser will prevent any javascript code trying to access the cookie. 

* **Implementation of Secure flag:** With the Secure flag, the browser is instructed to only return the cookie information to the application over HTTPS. This would be another layer of protection with the HTTPS. 

### 3. How do you ensure that if your database gets stolen passwords aren’t exposed?

Implementation of salting and hashing the password will make the passwords not to be exposed even though the database gets stolen. 

* **Hashing:** Even though the attackers view the hash, the attackers won’t be able to figure out the plaintext of the password. This is because hashing is a one-way and irreversible. 

* **Salting:** Even though the attackers prepare a rainbow table to match the hash, the salting will be able to prevent this. This is because a random salt has been added to the plaintext of the password before the entire payload got hashed. 

### 4. How do you prevent password brute force?

Usually password brute force is prevented through a various ways of rate limiting. 

Rate limiting could be added to various components of the web application, such as the web server, the frontend, and the backend. In Group 5’s case, since it is using an API to handle authentication, API rate limiting could be a good idea. Below are the rate limiting package/configuration/modules of the frontend, web server, and the back end. 


* **Nodejs** has a request-rate-limiter (https://www.npmjs.com/package/request-rate-limiter) which can be implemented. 

* **Nginx**  has a rate limiting configuration (https://www.nginx.com/blog/rate-limiting-nginx/) 

* **Flask** has a Flask-Limiter (https://pypi.org/project/Flask-Limiter/) 

With these package/configuration/modules, Group 5 can implement rate-limiting based on remote IP address, and/or based on the account name. The implementation of these will differ based on the business logic of the application. 

### 5. How do you prevent username enumeration? 
Username enumeration is often done through failed login attempt and analyzing the error message. If the error message is too specific and tells the user if only the username is wrong or if the password is wrong, this can be a hint to the attacker. 

For example, if the attacker enters a valid username but a wrong password, and the web application only returns “password is incorrect”, then the attacker have successfully enumerated the username. 

In order to prevent this, the web application needs to send a generic error message upon failed authentication attempt. For example, a simple “Incorrect Login” or a “Username and/or Password is incorrect” will be sufficient. 


### 6. What happens if your sessionID is predictable, how do you prevent that?

If the sessionID is predictable, an attacker could try to bruteforce the sessionID and based on possibility, find out a valid sessionID and hijack it. In some cases, the attacker doesn’t need to even bruteforce. for example, if the sessionID contains only the user name, the attacker could simply swap to “admin” and attempt to impersonate another user. 

In order to prevent this, sessionID must be created with random string. For example, Group 5’s backend creates a random string of sessioinID upon authentication. 

`new_key = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(128)])`

