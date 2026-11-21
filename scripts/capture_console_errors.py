import subprocess
import time
import urllib.request
import json
import sys

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([
    chrome_path,
    '--headless=new',
    '--remote-debugging-port=9222',
    '--enable-logging',
    '--v=1',
    'http://localhost:3000/'
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

time.sleep(3)

try:
    with urllib.request.urlopen('http://127.0.0.1:9222/json') as res:
        pages = json.loads(res.read().decode())
    print("Found pages:", pages)
    if pages:
        ws_url = pages[0].get('webSocketDebuggerUrl')
        print("WebSocket URL:", ws_url)
except Exception as e:
    print("Error querying Chrome:", e)
finally:
    proc.terminate()
    try:
        proc.wait(timeout=2)
    except:
        proc.kill()
