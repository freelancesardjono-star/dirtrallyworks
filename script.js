// =======================================
// script.js (COMPLETE & WORKING CODE)
// =======================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Fungsionalitas Fade-In saat Scrolling (untuk index.html atau halaman lain)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });


    // 2. Fungsionalitas Menandai Link Navigasi yang Aktif (hanya di index.html)
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        const navLinks = document.querySelectorAll('.nav a');
        const sections = document.querySelectorAll('section');

        function updateActiveLink() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const offset = window.innerHeight * 0.3; 
                if (scrollY >= sectionTop - offset) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href').includes(current)) {
                    a.classList.add('active');
                }
            });
        }
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); 
    }
    
    
    // =======================================
    // 3. LIGHTBOX/MODAL FUNCTIONALITY (WAJIB ADA DI SEMUA FILE)
    // =======================================
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const galleryImages = document.querySelectorAll(".gallery-grid img");
    const closeBtn = document.querySelector(".close-btn");
    
    // 1. Fungsi untuk membuka modal saat gambar diklik
    galleryImages.forEach(img => {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            captionText.innerHTML = this.alt || "Dirtrallyworks Photo"; 
        }
    });

    // 2. Fungsi untuk menutup modal
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    }

    // 3. Menutup modal jika klik di luar gambar
    modal.onclick = function(e) {
        if (e.target.classList.contains('modal')) {
            modal.style.display = "none";
        }
    }
    
    // 4. Menutup modal dengan tombol ESC
    document.onkeydown = function(e) {
        if (e.key === "Escape") {
            modal.style.display = "none";
        }
    };
});