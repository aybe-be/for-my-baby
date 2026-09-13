/* =========================================
   ELEMENTS
========================================= */

const intro = document.getElementById("intro");
const videoSection = document.getElementById("videoSection");
const mainContent = document.getElementById("mainContent");

const startButton = document.getElementById("startButton");
const enterButton = document.getElementById("enterButton");

const introVideo = document.getElementById("introVideo");

const musicButton = document.getElementById("musicButton");
const surpriseButton = document.getElementById("surpriseButton");

const letter = document.getElementById("letter");

const backgroundMusic = document.getElementById("backgroundMusic");


// =========================================
// MUSIC SETTINGS
// =========================================
backgroundMusic.volume = 0.35;
backgroundMusic.loop = true;
backgroundMusic.load();


// =========================================
// START MUSIC
// =========================================

function startMusic() {

    backgroundMusic.currentTime = backgroundMusic.currentTime || 0;

    backgroundMusic.play()
        .then(() => {

            console.log("🎵 MUSIC PLAYING");

            musicButton.classList.add("playing");
            musicButton.textContent = "♫";

        })
        .catch((error) => {

            console.error("🎵 MUSIC ERROR:", error);

        });

}


// =========================================
// OPEN WEBSITE
// =========================================

startButton.addEventListener("click", () => {

    // Start your song
    startMusic();

    // Hide intro
    intro.classList.add("hidden");

    // Show video
    videoSection.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =========================================
// ENTER MAIN WEBSITE
// =========================================

// =========================================
// ENTER MAIN WEBSITE
// =========================================

enterButton.addEventListener("click", () => {

    // Keep music playing
    if (backgroundMusic.paused) {
        startMusic();
    }

    // Fade out video
    videoSection.classList.add("fade-out");

    setTimeout(() => {

        // Switch sections
        videoSection.classList.add("hidden");
        mainContent.classList.remove("hidden");

        // Fade in main website
        mainContent.classList.add("fade-in");

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });

    }, 500);

});

// =========================================
// MUSIC BUTTON
// =========================================

musicButton.addEventListener("click", () => {

    if (backgroundMusic.paused) {

        startMusic();

    } else {

        backgroundMusic.pause();

        musicButton.classList.remove("playing");
        musicButton.textContent = "♪";

    }

});


// =========================================
// SURPRISE LETTER
// =========================================

surpriseButton.addEventListener("click", () => {

    letter.classList.remove("hidden");

    setTimeout(() => {

        letter.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

    createHearts();

});


// =========================================
// FLOATING HEARTS
// =========================================

function createHearts() {

    for (let i = 0; i < 18; i++) {

        const heart = document.createElement("div");

        heart.innerHTML =
            Math.random() > 0.5 ? "♡" : "✦";

        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "-30px";

        heart.style.fontSize =
            15 + Math.random() * 25 + "px";

        heart.style.color =
            "rgba(143, 202, 255, 0.8)";

        heart.style.pointerEvents = "none";
        heart.style.zIndex = "100";

        heart.style.transition =
            "transform 4s ease-out, opacity 4s ease-out";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.style.transform =
                `translateY(-${window.innerHeight + 100}px)
                 rotate(${Math.random() * 180}deg)`;

            heart.style.opacity = "0";

        }, 50);

        setTimeout(() => {

            heart.remove();

        }, 4200);

    }

}


// =========================================
// SCROLL REVEAL
// =========================================

const revealElements = document.querySelectorAll(
    ".story-item, .memory-card, .reason-card, .note-card, .surprise-card"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(35px)";

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    revealObserver.observe(element);

});


// =========================================
// VIDEO FINISHED
// =========================================

introVideo.addEventListener("ended", () => {

    enterButton.classList.add("glow-button");

});


// =========================================
// ESC KEY
// =========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        backgroundMusic.pause();

        musicButton.classList.remove("playing");
        musicButton.textContent = "♪";

    }

});