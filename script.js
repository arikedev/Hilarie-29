// Bouton scroll top
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Téléchargement CV (bouton section about + hero)
function setupDownload(buttonId) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    btn.addEventListener("click", () => {
        fetch("cv.pdf")
            .then(response => {
                if (!response.ok) throw new Error();
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Mon_CV.pdf";
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => {
                alert("⚠️ Le fichier CV n'a pas été trouvé. Vérifie son emplacement et son nom.");
            });
    });
}

setupDownload("downloadCV");
setupDownload("downloadCVHero");


// ===================== CARROUSEL ===================== //

const track = document.querySelector(".carousel-track");
const items = Array.from(document.querySelectorAll(".carousel-item"));
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");

let index = 0;

function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
    index = (index + 1) % items.length;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + items.length) % items.length;
    updateCarousel();
});
