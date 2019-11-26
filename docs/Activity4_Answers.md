# Activity 4

### 1. How do you prevent XSS in this step when displaying the username of the user who uploaded the video? 

There would be one fundamental ways of preventing XSS. 

* **When creating username: ** Upon users creating their username, perform a detailed userinput sanitization in order to prevent username with special characters. In most cases, making username with ascii characters and number digits would be sufficient. 

## 2. How do you ensure that users can't delete videos that aren't their own? 


```
if auth_user == str(Video.query.filter_by(username=auth_user).one().username):
    db.session.delete(matching_video)
    db.session.commit()
    return jsonify({'message': 'success'})
else:
    return jsonify({'error': 'failure: token doesn\'t match user'})
```

The above code in the backend endpoint makes sure the only request with the correct auth_user session token is able to delete the video. 

If the auth_user token does not match, the request that's sent from the `Delete` button is not processed. 
