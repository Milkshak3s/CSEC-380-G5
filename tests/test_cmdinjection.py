import requests 
import pytest

def test_cmdinjection(url, cmd):
    data = {'cmd': cmd}
    #print("[DEBUG] Sending: ", data)
    r = requests.post(url=url, data=data)

    #print(r.text)
    assert "Linux" in r.text
    assert 200 == r.status_code

def main():
    url = "http://127.0.0.1:5000/api/v1/cmdinjection"

    test_cmdinjection(url, '8.8.8.8; cat /etc/os-release')

if __name__ == '__main__':
    main()
