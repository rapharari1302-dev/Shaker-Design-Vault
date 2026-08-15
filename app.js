const ACCESS_KEY = 'shaker-vault-access';
const PASSWORD = 'q418bkV7';
const loginScreen = document.querySelector('#login-screen');
const loginForm = document.querySelector('#login-form');
const errorEl = document.querySelector('#login-error');
const fileList = document.querySelector('#file-list');
const empty = document.querySelector('#empty-state');
const count = document.querySelector('#file-count');

function formatSize(bytes) { if (!bytes) return '0 KB'; const units=['B','KB','MB','GB']; const i=Math.min(Math.floor(Math.log(bytes)/Math.log(1024)),3); return `${(bytes/1024**i).toFixed(i ? 1 : 0)} ${units[i]}`; }
function escapeHtml(value) { const el=document.createElement('span'); el.textContent=value; return el.innerHTML; }
function fileUrl(folder, name) { return `./${folder}/${encodeURIComponent(name)}`; }
function renderFiles(files) {
  count.textContent=`${files.length} ${files.length===1 ? 'Datei' : 'Dateien'}`;
  empty.hidden=Boolean(files.length);
  fileList.innerHTML=files.map((file,index) => {
    const preview=file.preview ? `<img src="${fileUrl(file.preview.folder, file.preview.name)}" alt="Vorschau für ${escapeHtml(file.name)}">` : '<span>NO<br>PREVIEW</span>';
    return `<article class="file-row"><span class="file-number">${String(index+1).padStart(2,'0')}</span><div class="file-preview">${preview}</div><strong class="file-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</strong><span class="file-meta">${formatSize(file.size)} · ${new Date(file.updated).toLocaleDateString('de-DE')}</span><a class="download" href="${fileUrl('uploads',file.name)}" download>DOWNLOAD ↓</a></article>`;
  }).join('');
}
async function loadFiles() {
  try { const response=await fetch('./files.json',{cache:'no-store'}); if (!response.ok) throw new Error(); const data=await response.json(); renderFiles(data.files || []); }
  catch { count.textContent='–'; empty.hidden=false; empty.textContent='Die Dateiliste wird beim nächsten GitHub-Pages-Deploy erstellt.'; }
}
function unlock() { sessionStorage.setItem(ACCESS_KEY,'true'); loginScreen.classList.add('hidden'); loadFiles(); }
loginForm.addEventListener('submit', event => { event.preventDefault(); const value=document.querySelector('#password').value; if(value===PASSWORD) unlock(); else errorEl.textContent='Falsches Passwort.'; });
document.querySelector('#logout').addEventListener('click',()=>{sessionStorage.removeItem(ACCESS_KEY);loginScreen.classList.remove('hidden');document.querySelector('#password').value='';errorEl.textContent='';});
if (sessionStorage.getItem(ACCESS_KEY)==='true') unlock();
