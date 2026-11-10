const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
test('Demo has valid JavaScript',()=>{assert.ok(script);new vm.Script(script)});
test('Demo is clearly labeled as disconnected from real Zalo',()=>{assert.match(html,/Chưa kết nối/);assert.match(html,/không đọc, gửi hoặc đồng bộ với Zalo thật/)});
test('Composer supports local-only sending',()=>{assert.match(html,/id="demoCompose"/);assert.match(script,/event\.preventDefault\(\)/);assert.match(script,/chat\.messages\.push/);assert.doesNotMatch(script,/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/)});
test('Drafts are isolated by chat',()=>{assert.match(script,/const drafts=new Map\(\)/);assert.match(script,/drafts\.set\(draftChat/);assert.match(script,/drafts\.get\(next\)/)});
test('Selection, copy and deletion remain available',()=>{for(const id of ['select','all','copy','delete'])assert.match(html,new RegExp('id="'+id+'"'));assert.match(script,/navigator\.clipboard/);assert.match(script,/confirm\('Xóa '/)});
test('No persistent browser storage is used',()=>{assert.doesNotMatch(script,/localStorage|sessionStorage|indexedDB|document\.cookie/)});
test('Import preview stays isolated from production',()=>{assert.match(html,/id="importPanel"/);assert.match(html,/id="importText"/);assert.match(html,/id="copyImport"/);assert.match(html,/không phải CUNCUN chính/);assert.match(script,/function syncImportPreview\(/);assert.match(script,/\$\('importText'\)\.value=text/)});
test('Import copy uses preview field and iPhone fallback',()=>{assert.match(script,/\$\('copyImport'\)\.onclick=async/);assert.match(script,/const field=\$\('importText'\),text=field\.value/);assert.match(script,/await navigator\.clipboard\.writeText\(text\)/);assert.match(script,/field\.setSelectionRange\(0,field\.value\.length\)/)});

test('Manual Zalo paste is isolated and never sends network requests',()=>{
 for(const id of ['togglePaste','pastePanel','pasteCustomer','pastePrice','pasteRegion','pasteText','previewPaste','pastePreview','copyPaste','pasteConfirmed'])
  assert.match(html,new RegExp('id="'+id+'"'));
 assert.match(script,/\$\('previewText'\)\.textContent=value/);
 assert.doesNotMatch(script,/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/);
});
test('Manual paste requires preview and explicit confirmation',()=>{
 assert.match(script,/\$\('pasteConfirmed'\)\.checked=false;\$\('copyPaste'\)\.disabled=true/);
 assert.match(script,/\$\('copyPaste'\)\.disabled=!\$\('pasteConfirmed'\)\.checked/);
 assert.match(script,/\$\('pastePreview'\)\.classList\.contains\('hidden'\)\|\|!\$\('pasteConfirmed'\)\.checked/);
 assert.match(script,/\$\('pasteText'\)\.oninput=\$\('pasteCustomer'\)\.oninput=\$\('pastePrice'\)\.onchange=\$\('pasteRegion'\)\.onchange/);
});
test('Pasted content is bounded and only copied after user action',()=>{
 assert.match(html,/id="pasteText"[^>]*maxlength="12000"/);
 assert.match(html,/id="pasteCustomer"[^>]*maxlength="80"/);
 assert.match(script,/\$\('copyPaste'\)\.onclick=async/);
 assert.match(script,/await navigator\.clipboard\.writeText\(value\)/);
});
