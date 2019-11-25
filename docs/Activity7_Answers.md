# Activity 7

Here is a google drive link to a video of us performing command injection on our website: https://drive.google.com/open?id=1rV6oGw4T-A9t2KnNPmHgrtYaz5msZ5N9

### 1. How would you fix your code so that this issue is no longer present?

The vulnerable code which causes the command injection is posted down below.

**Backend - app.py @app.route('/api/v1/cmdinjection', methods=['POST'])**
```
  userinput = request_data.get('cmd')
  payload = 'ping -c 2 ' + userinput 
  stream = os.popen(payload)
```

As we can see from the code, the backend code is not sanitizing any user input. The code will simply get the parameter `cmd` from the user, and append it at the end of the payload. 

To fix the code, the following practices is highly recommended. 

* **Implement API:** Instead of directly calling os execution command, having a related API or a library is recommended. This in case, it was a API, but the API itself was directly calling the os execution command. 

* **Sanitize user input for escape values:** Depending on the os, command injection often occurs with special characters such as `;`, `&&`, `||`, `&`, `|`, `<`, `>`, and more. Thus if the server-side programming language has a function to sanitize those special characters, it is recommended to implement them. 

Such examples would be `escapeshellarg()` or `escapeshellcmd()` in PHP. 

If not, creating and implementing such function would be an alternative idea.