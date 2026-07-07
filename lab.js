// --- SIMULASI LOADING DEPLOYMENT VM ---
window.onload = function() {
    const loader = document.getElementById('vmLoader');
    const statusText = document.getElementById('loadingStatus');
    const loadingBar = document.getElementById('loadingBar');

    setTimeout(() => { loadingBar.style.width = '30%'; statusText.innerText = '[+] Membangun Virtual Container...'; }, 800);
    setTimeout(() => { loadingBar.style.width = '70%'; statusText.innerText = '[+] Menjalankan Layanan Sistem...'; }, 1800);
    setTimeout(() => { loadingBar.style.width = '100%'; statusText.innerText = '[+] Environment Siap!'; }, 2600);
    
    setTimeout(() => { 
        loader.style.opacity = '0'; 
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 3200);
};

// --- LOGIKA TAB MANAGER ---
function switchTab(event, tabName) {
    // Hapus class active dari tab dan konten
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active-tab'));

    // Tambahkan class active ke elemen yang dipilih
    event.currentTarget.classList.add('active');
    document.getElementById(tabName + 'Content').classList.add('active-tab');

    // Auto-focus terminal jika tab terminal dibuka
    if(tabName === 'terminal') {
        setTimeout(() => document.getElementById('termInput').focus(), 50);
    }
}

// --- LOGIKA SUBMIT FLAG ---
function submitFlag() {
    const flag = document.getElementById('flagInput').value.trim();
    if (flag === 'SecurGo{w3lc0m3_t0_l1nux_b4s1cs}') {
        alert('Berhasil! Anda menyelesaikan task ini.');
        const btn = document.getElementById('btnSubmitFlag');
        btn.style.background = '#059669';
        btn.innerText = 'Selesai';
    } else {
        alert('Flag salah. Coba periksa lagi terminal Anda.');
    }
}

// --- LOGIKA ENGINE TERMINAL ---
const fileSystem = {
    'flag.txt': 'SecurGo{w3lc0m3_t0_l1nux_b4s1cs}',
    'readme.md': 'Gunakan perintah dasar untuk bernavigasi.'
};

const termInput = document.getElementById('termInput');
const termOutput = document.getElementById('terminalOutput');
const termContainer = document.getElementById('terminalContainer');

termInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const cmdString = this.value.trim();
        const args = cmdString.split(' ');
        const cmd = args[0].toLowerCase();
        
        printLine(`<span class="terminal-prompt">student@securgo</span>:<span class="terminal-dir">~</span>$ ${cmdString}`);
        
        if (cmd === 'help') {
            printLine('Instruksi tersedia: ls, cat, whoami, clear');
        } else if (cmd === 'whoami') {
            printLine('student');
        } else if (cmd === 'ls') {
            printLine(Object.keys(fileSystem).join('  '));
        } else if (cmd === 'cat') {
            if (args.length < 2) {
                printLine('cat: argumen file tidak ditemukan');
            } else if (fileSystem[args[1]]) {
                printLine(fileSystem[args[1]]);
            } else {
                printLine(`cat: ${args[1]}: File tidak ditemukan`);
            }
        } else if (cmd === 'clear') {
            termOutput.innerHTML = '';
        } else if (cmd !== '') {
            printLine(`<span style="color: #ef4444;">${cmd}: command not found</span>`);
        }

        this.value = '';
        termContainer.scrollTop = termContainer.scrollHeight;
    }
});

// Cetak baris HTML baru di layar terminal
function printLine(text) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = text;
    termOutput.appendChild(div);
}

// Kembalikan fokus ke input saat layar terminal diklik
termContainer.addEventListener('click', () => termInput.focus());

// Perluas file system
const fileSystem = {
    'flag.txt': 'SecurGo{b4s1c_l1nux_c0mpl3t3d}',
    'instruksi.txt': 'Cari flag yang tersembunyi di dalam sistem ini.',
    'exploit.py': 'print("Menjalankan script Python... Akses diberikan!")'
};

// Di dalam event listener 'keydown' untuk input terminal:
if (cmd === 'help') {
    printLine('Instruksi tersedia: ls, cat, whoami, clear, pwd, python3, sudo');
} else if (cmd === 'pwd') {
    printLine('/home/student');
} else if (cmd === 'python3') {
    if (args.length < 2) {
        printLine('python3: argumen file tidak ditemukan');
    } else if (fileSystem[args[1]] && args[1].endsWith('.py')) {
        // Simulasi menjalankan file python
        printLine(`<span style="color: #10b981;">${fileSystem[args[1]].replace('print("', '').replace('")', '')}</span>`);
    } else {
        printLine(`python3: tidak dapat membuka file '${args[1]}'`);
    }
} else if (cmd === 'sudo') {
    printLine('student is not in the sudoers file. This incident will be reported.');
} 
// ... (lanjutkan dengan logika ls, cat, dll yang sudah ada)