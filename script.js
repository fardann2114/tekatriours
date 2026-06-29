document.addEventListener('DOMContentLoaded', () => {

    // INTRO ANIMATION
    setTimeout(() => {
        const intro = document.querySelector('.book-intro');
        if (intro) intro.classList.add('open');
    }, 1500);


    const studentGrid = document.getElementById('studentGrid');
    const studentSearch = document.getElementById('studentSearch');

    // RENDER STUDENTS
    function renderStudents(data) {
        if (!studentGrid) return;

        studentGrid.innerHTML = '';

        data.forEach(student => {
            const card = document.createElement('div');
            card.className = 'student-card reveal';

            card.innerHTML = `
                <img src="${student.photo || 'assets/img/default.jpg'}" 
                     alt="${student.name}" 
                     class="student-img">
                <div class="student-info">
                    <span class="card-role">${student.role}</span>
                    <h3 class="card-name">${student.name}</h3>
                </div>
            `;

          // redirect + trigger autoplay di student page
card.addEventListener('click', () => {
    sessionStorage.setItem("autoPlayMusic", "true");
    window.location.href = `student.html?id=${student.id}`;
});

            studentGrid.appendChild(card);
        });

        observeRevealElements();
    }


    // SEARCH FUNCTION
    if (studentSearch) {
        studentSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = students.filter(s =>
                s.name.toLowerCase().includes(term)
            );
            renderStudents(filtered);
        });
    }


    // render awal
    if (typeof students !== 'undefined') {
        renderStudents(students);
    }


    // DARK MODE
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.onclick = () => {
            document.body.classList.toggle('dark-mode');

            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
        };
    }


    // music btn
    const music = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    let isPlaying = false;

    if (music && musicToggle) {

        musicToggle.onclick = () => {
            if (isPlaying) {
                music.pause();
            } else {
                music.play().catch(() => {});
            }
            isPlaying = !isPlaying;
            musicToggle.classList.toggle('active');
        };

        // autoplay setelah user interaction
        function startMusicOnce() {
            if (!isPlaying) {
                music.play().then(() => {
                    isPlaying = true;
                    musicToggle.classList.add("active");
                }).catch(() => {});
            }
            document.removeEventListener("click", startMusicOnce);
        }

        document.addEventListener("click", startMusicOnce);
    }

});


// animasi scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.2
});

function observeRevealElements() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => observer.observe(el));
}

function checkDeviceMode() {
    const popup = document.getElementById("devicePopup");
    if (!popup) return;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    if (isMobile && isPortrait) {
        popup.style.display = "flex";
    } else {
        popup.style.display = "none";
    }
}

window.addEventListener("load", checkDeviceMode);
window.addEventListener("resize", checkDeviceMode);

function closeDevicePopup() {
    document.getElementById("devicePopup").style.display = "none";
    localStorage.setItem("devicePopupClosed", "true");
}

function showDesktopGuide() {
    alert("Buka menu browser (⋮) lalu pilih 'Situs Desktop' atau 'Request Desktop Site'.");
}

window.addEventListener("load", checkDeviceMode);
window.addEventListener("resize", checkDeviceMode); 



const text = `Jika suatu hari nanti kita kembali 
membuka halaman ini,
mungkin kita sudah berada di tempat yang berbeda.

Ada yang sedang mengejar mimpi,
ada yang sibuk dengan kehidupannya,
dan mungkin kita sudah jarang saling bertemu.

Namun ketika foto-foto ini muncul kembali,
tawa di kelas,
candaan saat istirahat,
dan cerita-cerita kecil yang dulu terasa biasa saja…

akan terasa begitu berharga.

Karena di tempat inilah
kita pernah menjadi bagian dari cerita yang sama.

TEKATRIOUR'S bukan hanya tentang masa sekolah,
tetapi tentang tempat
di mana kita pernah bertumbuh bersama.

Dan suatu hari nanti,
ketika kita melihat kembali semua ini,

kita akan tersenyum
dan berkata:

"Ah… dulu kita pernah seperti ini."`

const typingElement = document.getElementById("typing-text")
const signature = document.querySelector(".signature")
const messageSection = document.querySelector(".message-section")

let index = 0
let started = false

function typeWriter(){

    if(!typingElement) return

    if(index < text.length){

        const char = text.charAt(index)

        typingElement.innerHTML += char

        index++

        let speed = 95

        if(char === ".") speed = 250
        if(char === ",") speed = 500
        if(char === "\n") speed = 600

        setTimeout(typeWriter, speed)

    }else{

        setTimeout(revealFinalMemory,2000)

    }

}



// not(.final-photo)foto perpisahan g ikt muter di awal
const slides = document.querySelectorAll(".memory-bg img:not(.final-photo)")
let slideIndex = 0
let slideInterval

function startSlideshow(){
    if(slides.length === 0) return

    slideInterval = setInterval(()=>{
        slides[slideIndex].classList.remove("active")
        slideIndex++
        if(slideIndex >= slides.length){
            slideIndex = 0
        }
        slides[slideIndex].classList.add("active")
    },5000)
}


function typeWriter(){
    if(!typingElement) return
    if(index < text.length){
        const char = text.charAt(index)
        typingElement.innerHTML += char
        index++
        let speed = 95
        if(char === ".") speed = 250
        if(char === ",") speed = 500
        if(char === "\n") speed = 600
        setTimeout(typeWriter, speed)
    }else{
        setTimeout(revealFinalMemory,2000)
    }
}


if(messageSection){
    const messageObserver = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting && !started){
                started = true
                setTimeout(typeWriter, 800)
                startSlideshow()
            }
        })
    },{
        threshold: 0.2 
    })

    messageObserver.observe(messageSection)
}


function revealFinalMemory(){
    const memoryBg = document.querySelector(".memory-bg")
    const finalPhoto = document.querySelector(".final-photo")

    clearInterval(slideInterval)

    if(memoryBg){
        memoryBg.classList.add("fade")
    }
    if(finalPhoto){
        finalPhoto.classList.add("show")
    }
    if(signature){
        setTimeout(()=>{
            signature.classList.add("show")
        },2000)
    }
}


window.openAlbum = function(yearKey) {
    const modal = document.getElementById("albumModal");
    const grid = document.getElementById("albumGrid");
    const title = document.getElementById("albumTitle");
    const desc = document.getElementById("albumDesc");


    if (typeof albumTimelineData === 'undefined' || !albumTimelineData[yearKey]) {
        console.error("Data album tidak ditemukan untuk kunci:", yearKey);
        return;
    }

    const data = albumTimelineData[yearKey];
    title.innerText = data.title;
    desc.innerText = data.desc;

    grid.innerHTML = "";

    // looping foton ke dlm grid
    data.photos.forEach(photoSrc => {
        const img = document.createElement("img");
        img.src = photoSrc;
        img.className = "album-item-img";
        
        // klik gambar muncul popup
        img.onclick = () => {
            const popup = document.getElementById("imagePopup");
            const popupImg = document.getElementById("popupImage");
            if(popup && popupImg) {
                popup.classList.add("show"); 
                popupImg.src = photoSrc;
            }
        };

        grid.appendChild(img);
    });

    // modal album
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Biar background web gak ikut ke-scroll
};

// closeAlbum 
window.closeAlbum = function() {
    const modal = document.getElementById("albumModal");
    if (!modal) return;
    
    modal.classList.remove("show");
    
    // animasi CSS beres baru balikin scroll web
    setTimeout(() => {
        document.body.style.overflow = "auto";
    }, 300);
};

// klik di luar kotak album 
document.addEventListener("DOMContentLoaded", () => {
    const albumModalElement = document.getElementById("albumModal");
    if (albumModalElement) {
        albumModalElement.addEventListener("click", (e) => {
            if (e.target.id === "albumModal") {
                window.closeAlbum();
            }
        });
    }
});


// nutup popup foto besar
function closeImagePopup() {
    const popup = document.getElementById("imagePopup");
    if (!popup) return;

    popup.classList.remove("show");
    
    // scroll modal album
    const albumModal = document.getElementById("albumModal");
    if(albumModal) albumModal.style.overflow = "auto";
}

// Klik di luar foto buat close album
const imagePopupElement = document.getElementById("imagePopup");
if (imagePopupElement) {
    imagePopupElement.addEventListener("click", (e) => {
        // kalo yang diklik adalah backgroundnya (id="imagePopup"), bukan gambarnya
        if (e.target.id === "imagePopup") {
            closeImagePopup();
        }
    });
}


window.closeImagePopup = function() {
    const popup = document.getElementById("imagePopup");
    if (popup) {
        popup.classList.remove("show"); // Sembunyiin popup
    }
    
    // balikin scroll modal album biar normal lagi
    const albumModal = document.getElementById("albumModal");
    if (albumModal) {
        albumModal.style.overflow = "auto";
    }
};

// deteksi klik pas web udah loading
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("imagePopup");
    const popupImg = document.getElementById("popupImage");

    // close pas background hitam diklik
    if (popup) {
        popup.addEventListener("click", (e) => {
            if (e.target.id === "imagePopup") {
                window.closeImagePopup();
            }
        });
    }

    // close pas gambarnya sendiri diklik 
    if (popupImg) {
        popupImg.addEventListener("click", () => {
            window.closeImagePopup();
        });
    }
});

// close ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const imagePopup = document.getElementById("imagePopup");
        // prioritas nutup popup foto dulu
        if (imagePopup && imagePopup.classList.contains('show')) {
            window.closeImagePopup();
        } else {
            // kalau popup foto lagi gak buka, coba nutup album (kalau ada)
            if (typeof closeAlbum === "function") {
                closeAlbum();
            }
        }
    }
});