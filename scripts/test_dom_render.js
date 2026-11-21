import { spawn } from 'child_process';
import fs from 'fs';

async function testPageAndDOM() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/new?http://localhost:3000/', { method: 'PUT' });
    const page = await listRes.json();
    console.log('Opened page, id:', page.id);

    const ws = new WebSocket(page.webSocketDebuggerUrl);

    await new Promise((resolve) => {
      ws.onopen = async () => {
        ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.exceptionThrown') {
          console.error('[UNCAUGHT EXCEPTION]:', msg.params.exceptionDetails.text);
        }
      };

      setTimeout(async () => {
        // Query innerText of root element
        ws.send(JSON.stringify({
          id: 10,
          method: 'Runtime.evaluate',
          params: { expression: 'document.getElementById("root").innerText' }
        }));
      }, 3000);

      ws.addEventListener('message', (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 10) {
          console.log('\n=== LIVE DOM RENDERED TEXT PREVIEW ===');
          console.log(msg.result?.result?.value?.slice(0, 500));
          console.log('=====================================\n');
          resolve();
        }
      });
    });

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    chrome.kill();
  }
}

testPageAndDOM();
