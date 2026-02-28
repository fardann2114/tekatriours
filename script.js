document.addEventListener('DOMContentLoaded', () => {

    // =============================
    // INTRO ANIMATION
    // =============================
    setTimeout(() => {
        const intro = document.querySelector('.book-intro');
        if (intro) intro.classList.add('open');
    }, 1500);


    const studentGrid = document.getElementById('studentGrid');
    const studentSearch = document.getElementById('studentSearch');


    // =============================
    // RENDER STUDENTS
    // =============================
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
                    <p>"${student.quote}"</p>
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


    // =============================
    // SEARCH FUNCTION
    // =============================
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


    // =============================
    // DARK MODE
    // =============================
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


    // =============================
    // MUSIC CONTROL
    // =============================
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


// =============================
// SCROLL REVEAL ANIMATION
// =============================
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