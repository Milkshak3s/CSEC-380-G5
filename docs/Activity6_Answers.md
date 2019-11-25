# Activity 7

### 1. How would you fix your code so that this issue is no longer present?

The vulnerable code which causes the command injection is posted down below.

**Backend - app.py @app.route('/api/v1/ssrf', methods=['POST'])**
```
	userinput = request_data.get('ssrf')
	userinput = userinput.rstrip()
	proc = subprocess.Popen(["curl", userinput], stdout=subprocess.PIPE)
```

As we can see from the code, the backend code is not sanitizing any user input. The code will simply get the parameter `ssrf` from the user, and append it at the end of the payload. 

The could be two fixes for this vulnerability. 

* **Whitelist DNS resolution:** In this case, the web application is making a HTTP/S request. In order to prevent SSRF in this case, whitelisting DNS resolution so the application can only make request to specific domain would be the best case scenario. 

* **Do not use system command `curl`, create an API for functionality:** In the vulnerable code above, the code is using a system-level binary `curl` for the application functionality. It is highly recommended that web applications should run functionalities from the application, not from the underlying OS. Using python library such as `requests` would do the same functionality.

* **Disable non-HTTP/HTTPS schemas:** SSRF is not only useful for HTTP, but could be utilized for other URL schemas such as `File` or `ftp` as well. If the application logic does not need those URL schema, it is best practice to disable these schemas. 

## 2. How does your test demonstrate SSRF as opposed to just accessing any old endpoint.

This our testing cases, the SSRF is demonstrated by utilizing a different schema, `file`. The test code will send a SSRF payload of `file:///etc/passwd` can utilize SSRF to view local filesystem file. 