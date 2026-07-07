// --- SISTEM ROUTING & HISTORY BROWSER ---

// Fungsi untuk mengganti tampilan
function changeView(viewId, updateHistory = true) {
    // 1. Sembunyikan semua section
    document.querySelectorAll('.view-section').forEach(view => {
        view.classList.remove('active-view', 'active-view-flex');
    });
    
    // 2. Tampilkan section yang dituju
    const targetView = document.getElementById(viewId);
    if (targetView) {
        if (viewId === 'dashboardView') {
            targetView.classList.add('active-view-flex');
        } else {
            targetView.classList.add('active-view');
        }
    }
    
    // 3. Kembali ke atas layar
    window.scrollTo(0,0);

    // 4. Catat ke riwayat browser (agar tombol Back berfungsi)
    if (updateHistory) {
        window.location.hash = viewId;
    }
}

// Deteksi jika tombol "Back" atau "Forward" di browser ditekan
window.addEventListener('hashchange', () => {
    // Ambil teks setelah tanda '#' (misal: dari '#loginView' jadi 'loginView')
    const currentHash = window.location.hash.substring(1); 
    
    if (currentHash) {
        changeView(currentHash, false); // false = jangan catat ulang ke history
    } else {
        changeView('landingView', false); // Jika tidak ada hash, kembali ke halaman utama
    }
});

// Deteksi saat halaman pertama kali dimuat atau di-refresh
window.addEventListener('load', () => {
    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        changeView(currentHash, false);
    } else {
        // Halaman default saat pertama kali dibuka
        changeView('landingView', false);
    }
});


// --- SIMULASI LOGIN ---
function handleLogin(event) {
    event.preventDefault();
    // Pindah ke dashboard dan catat ke riwayat browser
    changeView('dashboardView');
}