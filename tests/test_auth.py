import requests 
import pytest

def test_frontend():
    """
    Test case for checking if the application's frontend works 
    """

    res = requests.get("http://127.0.0.1")
    
    #print("[DEBUG", res.text)
    assert "Web site created using create-react-app" in res.text

def test_valid_auth(url, username, password):
    """
    Test case for valid authentication to the application 
    """

    #print("[DEBUG] username =", username, "password = ", password)
    data = {'username':username,'password':password}
    r = requests.post(url=url, json=data)

    #print("[DEBUG]", r.text)
    assert "token" in r.text

# Need to test /api/v1/token as well 
def test_invalid_auth(url, username, password):
    """
    Test case for invalid authentication to the application 
    """

    #print("[DEBUG] username =", username, "password = ", password)
    data = {'username':username,'password':password}
    r = requests.post(url=url, json=data)

    #print("[DEBUG]", r.text)
    assert "Invalid login" in r.text

    
def main():
    #test_page()
    url = "http://127.0.0.1:5000/api/v1/auth"

    # Testing for frontend
    test_frontend() 

    # Testing for Successful login 
    test_valid_auth(url, "admin", "adminpassword")

    # Testing for invalid authentication - Wrong password
    test_invalid_auth(url, "admin", "nevergonnagiveyouupnevergonnaletyoudown")

    # esting for invalid authentication - Wrong Username 
    test_invalid_auth(url, "suspiciousnotadminuser", "adminpassword")

if __name__ == '__main__':
    main()
