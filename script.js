function selectOption(option) {
    selectedOption = option;
    const options = document.querySelectorAll('.option');
    options.forEach(btn => btn.style.border = '');
    document.querySelector(`.option[onclick="selectOption('${option}')"]`).style.border = '3px solid #ff6f31';
}




    // Type all questions in the header
function typeWriter(element, text, index = 0, speed = 100) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        setTimeout(() => typeWriter(element, text, index + 1, speed), speed);
    }
}

let currentQuestionIndex = 0;
const questions = document.querySelectorAll('.question'); // Select all questions

function changeQuestion() {
    // Hide all questions
    questions.forEach(el => el.classList.remove('active'));

    // Show the current question
    const currentQuestion = questions[currentQuestionIndex];
    currentQuestion.classList.add('active');
    
    // Clear the text before typing out again
    currentQuestion.innerHTML = '';

    // Start typing the question text
    const questionText = currentQuestion.getAttribute('data-text');
    typeWriter(currentQuestion, questionText);

    // Increase the index for the next question
    currentQuestionIndex++;

    // If the index exceeds the length of the array, reset to 0
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0;
    }
}

// Change the question every 5 seconds
setInterval(changeQuestion, 4000);


// Start immediately
changeQuestion();


// Nuova funzione per rivelare il testo scorrendo
let lastScrollY = window.scrollY; // Posizione di scroll precedente

// Funzione per verificare se un elemento è visibile nella viewport
function isInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Funzione per gestire la rivelazione delle parole
function handleScrollEffect() {
    const textElement = document.querySelector('.text');
    const words = textElement.innerText.split(' '); // Divide il testo in parole
    textElement.innerHTML = ''; // Pulisce il contenuto originale

    // Avvolgi ogni parola in un 'span' per poterla manipolare separatamente
    words.forEach(word => {
        const span = document.createElement('span');
        span.innerText = word; // Aggiungi solo la parola
        span.style.marginRight = '15px'; // Imposta spazio extra tra le parole
        textElement.appendChild(span);
    });

    const spans = textElement.querySelectorAll('span'); // Seleziona tutte le parole nel testo

    // Aggiungi un listener per lo scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY; // Get the current scroll position
        const windowHeight = window.innerHeight; // Get the height of the viewport
        const documentHeight = document.documentElement.scrollHeight; // Get the total height of the document

        // Calcola la percentuale dello scroll
        const scrollPercentage = (scrollPosition / (documentHeight - windowHeight));

        // **Ritardo uniforme per entrambi i dispositivi (desktop e mobile)**
        const offset = 0.1; // Ritardo fisso (10%) per entrambi i dispositivi
        const adjustedScrollPercentage = Math.max(0, scrollPercentage - offset); // Offset per il ritardo iniziale

        // Moltiplicatore per desktop (2) e mobile (1.5)
        const multiplier = window.innerWidth < 768 ? 5 : 9; // Più lento su mobile
        const visibleWordCount = Math.floor(adjustedScrollPercentage * words.length * multiplier); // Calcoliamo quante parole devono essere visibili

        // Se la sezione è visibile, inizia a mostrare le parole
        spans.forEach((span, index) => {
            if (index < visibleWordCount) {
                setTimeout(() => {
                    span.classList.add('visible'); // Aggiungi la classe visible per rivelare la parola
                }, 250); // Ritardo uniforme di 200ms per entrambi i dispositivi
            } else {
                span.classList.remove('visible'); // Rimuove la classe visible per nascondere la parola
            }
        });
    });
}

// Chiamata alla funzione per rivelare il testo durante lo scroll
handleScrollEffect();






// Second text appearing Funzione per verificare se un elemento è visibile nella viewport
function isInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Funzione per gestire la rivelazione delle parole nel secondo testo
function handleSecondTextEffect() {
    const textElement = document.querySelector('.expense-text');
    if (!textElement) return; // Se non esiste, non proseguiamo

    // Aggiungiamo la classe 'visible' per l'animazione
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        // Verifica se il secondo testo è entrato nella viewport
        if (isInView(textElement)) {
            textElement.classList.add('visible'); // Applica l'effetto di fade-in e movimento
        } else {
            textElement.classList.remove('visible'); // Nascondi il testo quando esce dalla vista
        }
    });
}

// Chiamata alla funzione per il secondo testo
handleSecondTextEffect();







// Adding goToStep and resetSteps and updateProgressBar functions 

let currentStep = 0; // Track current step

function goToStep(step) {
    // Hide all steps and the default view
    document.querySelectorAll('.modal-step').forEach(stepElement => {
        stepElement.classList.add('hidden');
    });
    document.getElementById('default-view').classList.add('hidden');

    // Show the selected step or default view
    if (step === 0) {
        document.getElementById('default-view').classList.remove('hidden');
        updateProgressBar(0); // Reset progress bar
    } else {
        document.getElementById(`modal-step-${step}`).classList.remove('hidden');
        updateProgressBar(step * 25); // Update progress bar (25%, 50%, etc.)
    }

    currentStep = step;
}

function resetSteps() {
    goToStep(0); // Return to the default view
}

function updateProgressBar(percentage) {
    const progressBar = document.querySelector('.progress-bar::before');
    const progressValue = document.querySelector('.progress-value');
    progressBar.style.width = `${percentage}%`; // Animate the width
    progressValue.textContent = `${percentage}%`;
}





// Select option placeholder function


var swiper = new Swiper(".swiper-container", {
    cssMode: true,
    speed: 1000,
    slidesPerView: "auto",
    centeredSlides: false, // Start from the left side
    spaceBetween: 20,
    mousewheel: true,
    keyboard: true,
});

document.addEventListener("DOMContentLoaded", () => {
    const videoSection = document.querySelector(".custom-video-section");

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Espandi il video al 70% e rendilo visibile
                    entry.target.style.transform = "scale(0.7)";
                    entry.target.style.opacity = "1";
                } else {
                    // Riduci il video al 30% e nascondilo se non è visibile
                    entry.target.style.transform = "scale(0.3)";
                    entry.target.style.opacity = "0";
                }
            });
        }, { threshold: 0.1 }); // Trigger al 10% di visibilità

        observer.observe(videoSection);
    } else {
        // Fallback per browser non compatibili
        videoSection.style.transform = "scale(0.7)";
        videoSection.style.opacity = "1";
    }
});

// Add stability to dynamically updating spans
document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".question");
    const container = document.querySelector("h1");

    if (container) {
        container.style.overflow = "hidden"; // Avoid layout overflow issues
    }

    questions.forEach((question) => {
        question.style.display = "block";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,  // Use the viewport as the container.
        rootMargin: '0px',
        threshold: 0.5  // Trigger when 50% of the target is visible.
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When video is visible, trigger the text animation
                const expenseText = document.querySelector('.new-expense-text');
                expenseText.style.transform = 'translateY(0)';
                expenseText.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Target the video container for observation
    const videoContainer = document.querySelector('.custom-video-frame');
    observer.observe(videoContainer);
});
