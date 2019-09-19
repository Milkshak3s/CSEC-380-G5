import requests
import unittest
from bs4 import BeautifulSoup

class MyTest(unittest.TestCase):
    def test_getBody(self):
        self.assertIn('Hello World', getBody('http://localhost/'))

def getBody(url):
    res = requests.get(url).content
    soup = BeautifulSoup(res, "html.parser")
    soupBody = soup.body.get_text()

    return soupBody


if __name__ == '__main__':
    print("\nTesting for dummy apache2 frontend\n")
    unittest.main()
