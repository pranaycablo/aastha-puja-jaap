import { spawn } from 'child_process';

async function testPage() {
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
        console.log('CDP Connected!');
        // Enable Console and Runtime
        ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.consoleAPICalled') {
          console.log(`[CONSOLE ${msg.params.type.toUpperCase()}]:`, msg.params.args.map(a => a.value || a.description).join(' '));
        } else if (msg.method === 'Runtime.exceptionThrown') {
          console.error('[UNCAUGHT EXCEPTION]:', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description || JSON.stringify(msg.params.exceptionDetails));
        }
      };

      setTimeout(() => {
        resolve();
      }, 5000);
    });

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    chrome.kill();
  }
}

testPage();
