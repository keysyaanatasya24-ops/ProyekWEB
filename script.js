





const kulinerSurabaya = [
    // --- Makanan Berat (Main Dishes) ---
    {
        id: 1,
        nama: "Rawon Setan",
        deskripsi: "Daging sapi kuah hitam pekat khas dengan bumbu kluwek. Kuahnya kaya rempah dan disajikan dengan tauge pendek.",
        kategori: "Makanan Berat",
        harga: 35000,
        rating: 4.8,
        gambar: "rawon.jpg"
    },
    {
        id: 2,
        nama: "Lontong Balap",
        deskripsi: "Lontong, tauge, tahu goreng, lento, dan sambal petis. Disajikan dengan sate kerang sebagai pendamping wajib.",
        kategori: "Makanan Berat",
        harga: 15000,
        rating: 4.5,
        gambar: "lontong-balap.jpg"
    },
    {
        id: 3,
        nama: "Rujak Cingur",
        deskripsi: "Campuran buah, sayuran, lontong, tahu, tempe, dan cingur (moncong sapi) dengan bumbu petis manis pedas.",
        kategori: "Makanan Berat",
        harga: 25000,
        rating: 4.6,
        gambar: "rujak-cingur.jpg"
    },
    {
        id: 4,
        nama: "Nasi Goreng Jancuk",
        deskripsi: "Nasi goreng super pedas dengan bumbu rahasia. Porsi besar, cocok untuk dibagi 2-3 orang.",
        kategori: "Makanan Berat",
        harga: 40000,
        rating: 4.7,
        gambar: "nasi-goreng-jancuk.jpg"
    },
    
    // --- Makanan Ringan (Snacks) ---
    {
        id: 5,
        nama: "Tahu Tek",
        deskripsi: "Tahu goreng, lontong, kentang, dan tauge, disiram saus kacang petis yang kental dan lezat.",
        kategori: "Makanan Ringan",
        harga: 18000,
        rating: 4.4,
        gambar: "tahu-tek.jpg"
    },
    {
        id: 6,
        nama: "Semanggi Suroboyo",
        deskripsi: "Semanggi rebus (sejenis daun) disiram bumbu pecel dari ketela rambat dan petis. Disantap dengan kerupuk puli.",
        kategori: "Makanan Ringan",
        harga: 10000,
        rating: 4.3,
        gambar: "pecel-semanggi.jpg"
    },
    
    // --- Minuman (Drinks) ---
    {
        id: 7,
        nama: "Es Dawet Siwalan",
        deskripsi: "Minuman segar dari dawet dan buah siwalan, disajikan dengan santan dan gula merah. Khas daerah pantura.",
        kategori: "Minuman",
        harga: 12000,
        rating: 4.5,
        gambar: "es-dawet.jpg"
    },
    {
        id: 8,
        nama: "Es Krim Zangrandi",
        deskripsi: "Es krim legendaris Surabaya yang sudah ada sejak zaman Belanda. Wajib coba rasa klasik Nougat atau Tutti Frutti.",
        kategori: "Minuman",
        harga: 20000,
        rating: 4.9,
        gambar: "es-krim-zangrandi.jpg"
    }
];

// Dapatkan container HTML
const container = document.getElementById('kuliner-container');
const filterInput = document.getElementById('filter-search');
const filterSelect = document.getElementById('filter-kategori');


/**
 * Fungsi untuk memformat angka menjadi format mata uang Rupiah
 * @param {number} number - Nilai angka harga
 * @returns {string} - Harga dalam format Rp
 */
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

/**
 * Fungsi utama untuk membuat elemen kartu kuliner
 * @param {Array} dataToRender - Array data kuliner yang akan ditampilkan
 */
function renderKuliner(dataToRender) {
    // Kosongkan container sebelum merender yang baru
    container.innerHTML = ''; 

    if (dataToRender.length === 0) {
        container.innerHTML = '<p class="not-found">😭 Maaf, kuliner yang Anda cari tidak ditemukan. Coba kata kunci lain!</p>';
        return;
    }

    dataToRender.forEach(kuliner => {
        const card = document.createElement('div');
        card.classList.add('kuliner-card');

        // Menggunakan rating untuk menampilkan bintang (inovatif)
        const ratingStars = '⭐'.repeat(Math.round(kuliner.rating));
        
        card.innerHTML = `
            <img src="images/${kuliner.gambar}" alt="${kuliner.nama}" loading="lazy">
            <div class="card-body">
                <span class="category-tag">${kuliner.kategori}</span>
                <h3>${kuliner.nama}</h3>
                <p>${kuliner.deskripsi}</p>
                
                <div class="card-footer-details">
                    <strong class="price-tag">${formatRupiah(kuliner.harga)}</strong>
                    <span class="rating-tag">${ratingStars} (${kuliner.rating})</span>
                </div>

                <button 
                    onclick="showDetail('${kuliner.nama}', '${kuliner.deskripsi}', '${formatRupiah(kuliner.harga)}')"
                    aria-label="Lihat detail ${kuliner.nama}"
                >
                    Lihat Detail
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

/**
 * Fungsi untuk menampilkan detail (simulasi modal/pop-up)
 * @param {string} nama
 * @param {string} deskripsi
 * @param {string} harga
 */
function showDetail(nama, deskripsi, harga) {
    alert(`
    --- DETAIL KULINER ---
    Nama: ${nama}
    Harga: ${harga}
    Deskripsi: ${deskripsi}
    
    Ini adalah simulasi fitur detail. Dalam pengembangan fiturnya akan menampilkan halaman terpisah.
    `);
}


/**
 * Fungsi untuk menjalankan Filter dan Pencarian secara bersamaan
 */
function applyFilters() {
    const searchTerm = filterInput.value.toLowerCase();
    const selectedCategory = filterSelect.value;
    
    let filteredData = kulinerSurabaya;

    // 1. Filter Kategori
    if (selectedCategory !== 'Semua') {
        filteredData = filteredData.filter(kuliner => kuliner.kategori === selectedCategory);
    }

    // 2. Filter Pencarian (Search)
    if (searchTerm) {
        filteredData = filteredData.filter(kuliner => 
            kuliner.nama.toLowerCase().includes(searchTerm) || 
            kuliner.deskripsi.toLowerCase().includes(searchTerm)
        );
    }
    
    // Render hasil yang telah difilter
    renderKuliner(filteredData);
}


// Event Listener: Panggil applyFilters setiap kali input berubah atau kategori dipilih
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi tampilan awal
    renderKuliner(kulinerSurabaya); 
    
    // Hubungkan event listener ke input search dan select filter
    filterInput.addEventListener('input', applyFilters);
    filterSelect.addEventListener('change', applyFilters);
});










// Baris baru (link ke halaman detail):
const encodedNama = encodeURIComponent(kuliner.nama);
const detailUrl = `detail.html?id=${kuliner.id}&nama=${encodedNama}`;

card.innerHTML = `
    <button 
        onclick="window.location.href='${detailUrl}'"
        aria-label="Lihat detail ${kuliner.nama}"
    >
        Lihat Detail
    </button>
    `;
// Catatan: Fungsi showDetail() sekarang sudah tidak digunakan di sini.











// Catatan: Array 'kulinerSurabaya' sudah tersedia karena di-import di detail.html

// Fungsi untuk mendapatkan parameter dari URL (Query String)
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fungsi utama untuk memuat dan menampilkan detail produk
function loadProductDetail() {
    const productId = parseInt(getUrlParameter('id')); // Ambil ID dari URL
    const detailContainer = document.getElementById('product-detail');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    // Sembunyikan spinner
    loadingSpinner.style.display = 'none';

    // Cari produk berdasarkan ID
    const product = kulinerSurabaya.find(item => item.id === productId);

    if (!product) {
        detailContainer.innerHTML = '<h2>404 - Kuliner Tidak Ditemukan!</h2><p>Silakan kembali ke halaman utama.</p>';
        document.getElementById('detail-title').textContent = 'Kuliner Tidak Ditemukan';
        return;
    }
    
    // Formatting
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(product.harga);
    
    const ratingStars = '⭐'.repeat(Math.round(product.rating));
    
    // Update Title Halaman
    document.getElementById('detail-title').textContent = `Detail: ${product.nama}`;

    // Render Konten Detail
    detailContainer.innerHTML = `
        <div class="detail-header">
            <h2 class="detail-name">${product.nama}</h2>
            <span class="detail-category-tag">${product.kategori}</span>
        </div>
        
        <div class="detail-body">
            <div class="detail-image-wrapper">
                <img src="images/${product.gambar}" alt="Foto ${product.nama}">
            </div>
            
            <div class="detail-info">
                <h3>Deskripsi Singkat:</h3>
                <p class="detail-description">${product.deskripsi}</p>
                
                <hr>

                <div class="detail-meta">
                    <p><strong>Harga Estimasi:</strong> <span class="detail-price">${formattedPrice}</span></p>
                    <p><strong>Rating Pengguna:</strong> <span class="detail-rating">${ratingStars} (${product.rating}/5.0)</span></p>
                    <p><strong>Kategori:</strong> ${product.kategori}</p>
                </div>
                
                <button class="action-button">Pesan Sekarang (Simulasi)</button>
            </div>
        </div>
    `;
}

// Panggil fungsi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', loadProductDetail);









