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
                    <h3>${student.name}</h3>
                    <p>- ${student.role} -</p>
                </div>
            `;

          // Redirect + trigger autoplay di student page
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


    // Render awal
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


    // Music btn
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

        // Autoplay setelah user interaction
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



const slides = document.querySelectorAll(".memory-bg img")
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



if(messageSection){

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting && !started){

                started = true

                setTimeout(typeWriter,800)

                startSlideshow()

            }

        })

    },{
        threshold:0.6
    })

    observer.observe(messageSection)

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