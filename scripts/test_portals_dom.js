import { spawn } from 'child_process';

async function checkPortals() {
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
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    ws.onopen = () => {
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `Array.from(document.querySelectorAll('button')).map(b => b.innerText.replace(/\\s+/g, ' ').trim()).filter(t => t.includes('दर्शन') || t.includes('मनका')).join('\\n---PORTAL---\\n')`
          }
        }));
      }, 2000);
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.id === 1) {
        console.log('PORTALS FOUND IN DOM:');
        console.log(data.result?.result?.value);
        chrome.kill();
        process.exit(0);
      }
    };
  } catch (err) {
    console.error(err);
    chrome.kill();
    process.exit(1);
  }
}
checkPortals();

