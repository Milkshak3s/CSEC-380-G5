# Activity 5

Here is a google drive link to a video of us performing classic sql injection: https://drive.google.com/open?id=1iveLgsZPioSxhBw9oaSDX_Qqm6gtlge8

### 1. How would you fix your code so that this issue is no longer present?

The vulnerable code which causes the sqli injection is posted down below.

**Backend - app.py @app.route('/api/v1/classicsqlinjection', methods=['POST'])**
```
    resultproxy = db.engine.execute("SELECT * FROM users where username = '%s'" % (userinput))
```

**Backend - app.py @app.route('/api/v1/blindsqlinjection', methods=['POST'])**
```
	resultproxy = db.engine.execute("SELECT * FROM users where username = '%s'" % (userinput))
```

As we can see from the code above, the backend code is executing a **raw sql query** directly to the database. Often or not, without a sophisticated user input sanitization, this is bound to cause some kind of problem. In this case, it have caused sql injection. 

To fix this problem, the developer actually doesn't need to do too much of a heavy lifting. 

Most of the database API for web application framework will provide with a proper API that takes care of the user input sanitization. For example, `SQLEngine` object of `SQLAlchemy` for flask framework will basically take care of any "special" characters. (Reference: http://www.rmunn.com/sqlalchemy-tutorial/tutorial.html) 

If the developer choose to implement a raw sql query (which is highly not recommended), the following could be suggested.

* **Sanitize user input for escape values:** Depending on the backend database, the sql injection attack often occurs with special characters such as `'`, `"`, `-- - `, `#`, and more. Usually SQL injection will require some of the quote escape and commenting (`-- -` or `--` or `#`).


### 2. What are the limitations, if any that, of the SQL Injection issues you've included? 

Limitation of SQL injection attack is that most often than not, it only gives information disclosure to the attacker. In rare cases, based on the database user's privilege, there are ways to execute code through sql injection. But in most and modern cases, it is impossible. 

Should the database does not have any useful information that the attacker can utilize, the sql injection might not provide that much advantage to the attacker. 