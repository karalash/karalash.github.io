// Бургер-меню
const burgerMenu = document.querySelector('.burger-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

if (burgerMenu && offScreenMenu) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        offScreenMenu.classList.toggle('active');
    });
}

// Акордеон
function toggleAnswer(element) {
    const openAnswers = document.querySelectorAll('.faq-answer.open');

    openAnswers.forEach(answer => {
        if (answer !== element.closest('.question-card')?.querySelector('.faq-answer')) {
            answer.classList.remove('open');
            const openIcon = answer.closest('.question-card')?.querySelector('.faq-question .question-tab-icon i');
            openIcon?.classList.replace('fa-xmark', 'fa-plus');
        }
    });

    const answer = element.closest('.question-card')?.querySelector('.faq-answer');
    const icon = element.querySelector('.question-tab-icon i');

    if (answer?.classList.contains('open')) {
        answer.classList.remove('open');
        icon?.classList.replace('fa-xmark', 'fa-plus');
    } else {
        answer?.classList.add('open');
        icon?.classList.replace('fa-plus', 'fa-xmark');
    }
}

// Кнопка See All FAQ's
function toggleFaqs() {
    const faqContainer = document.getElementById('faqContainer');
    const toggleButton = document.getElementById('toggleFaqButton');

    if (faqContainer && toggleButton) {
        const questionCards = faqContainer.querySelectorAll('.question-card');
        const allVisible = !Array.from(questionCards).some(card => card.classList.contains('hidden'));

        if (allVisible) {
            questionCards.forEach((card, index) => {
                if (index >= 5) {
                    card.classList.add('hidden');
                }
            });
            toggleButton.textContent = "See All FAQ’s";
        } else {
            questionCards.forEach(card => {
                card.classList.remove('hidden');
            });
            toggleButton.textContent = "Show less FAQ’s";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    toggleFaqs();
});

// Місячний-річний план
document.addEventListener("DOMContentLoaded", function () {
    const prices = {
        monthly: {
            free: "$0",
            pro: "$79",
            suffix: "/month"
        },
        yearly: {
            free: "$0",
            pro: "$799",
            suffix: "/year"
        }
    };

    function updatePrices(period) {
        const freePlanPrice = document.getElementById("free-plan-price");
        const proPlanPrice = document.getElementById("pro-plan-price");

        if (freePlanPrice && proPlanPrice) {
            freePlanPrice.childNodes[0].textContent = prices[period].free;
            proPlanPrice.childNodes[0].textContent = prices[period].pro;

            freePlanPrice.querySelector("span").textContent = prices[period].suffix;
            proPlanPrice.querySelector("span").textContent = prices[period].suffix;
        }
    }

    const monthlyTab = document.getElementById("monthly-tab");
    const yearlyTab = document.getElementById("yearly-tab");

    if (monthlyTab && yearlyTab) {
        monthlyTab.addEventListener("click", function () {
            monthlyTab.setAttribute("active", "");
            yearlyTab.removeAttribute("active");

            updatePrices("monthly");
        });

        yearlyTab.addEventListener("click", function () {
            yearlyTab.setAttribute("active", "");
            monthlyTab.removeAttribute("active");

            updatePrices("yearly");
        });

        updatePrices("monthly");
    }
});

// Хедер
window.addEventListener('scroll', function () {
    const promoButton = document.getElementById('promo-button');
    const header = document.querySelector('header');

    if (promoButton && header) {
        if (window.scrollY > 50) {
            promoButton.classList.add('hide');
            header.classList.add('scrolled');
        } else {
            promoButton.classList.remove('hide');
            header.classList.remove('scrolled');
        }
    }
});

// Відео
document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.querySelector(".play-button");
    const videoPoster = document.querySelector(".video-placeholder");
    const video = document.querySelector(".lazy-video");

    if (playButton && videoPoster && video) {
        playButton.addEventListener("click", function () {
            const source = video.querySelector("source");
            if (source) {
                source.src = source.getAttribute("data-src");
                video.load();

                videoPoster.style.display = "none";
                video.style.display = "block";

                video.play();
            }
        });
    }
});

// Кнопка View All
function toggleDescription(sectionId) {
    const description = document.getElementById(sectionId + '-description');
    const button = document.getElementById(sectionId + '-button');

    if (description && button) {
        if (description.classList.contains('expanded')) {
            description.classList.remove('expanded');
            button.textContent = 'View All';
        } else {
            description.classList.add('expanded');
            button.textContent = 'Show Less';
        }
    }
}

['benefits', 'courses', 'testimonials'].forEach(section => {
    const button = document.getElementById(section + '-button');
    if (button) {
        button.addEventListener('click', function () {
            toggleDescription(section);
        });
    }
});

// Відгуки
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('testimonials-container');
    const modal = document.getElementById('testimonial-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalAuthorImg = document.getElementById('modal-author-img');
    const modalAuthorName = document.getElementById('modal-author-name');
    const modalReviewText = document.getElementById('modal-review-text');

    if (container && modal && modalClose && modalAuthorImg && modalAuthorName && modalReviewText) {
        fetch('/testimonials-json/')
            .then(response => response.json())
            .then(data => {
                data.forEach(testimonial => {
                    const card = document.createElement('div');
                    card.className = 'testimonial-card';

                    card.innerHTML = `
                        <div class="testimonial-main">
                            <p>${testimonial.previewText}</p>
                        </div>
                        <div class="testimonial-footer">
                            <div class="testimonial-author-info">
                                <div class="testimonial-author-img">
                                    <picture>
                                        <source srcset="${testimonial.image}.webp" type="image/webp">
                                        <img src="${testimonial.image}.png" alt="${testimonial.altText}">
                                    </picture>
                                </div>
                                <span class="testimonial-author-name">${testimonial.name}</span>
                            </div>
                            <button data-id="${testimonial.id}">Read Full Story</button>
                        </div>
                    `;

                    container.appendChild(card);

                    card.querySelector('button').addEventListener('click', () => {
                        modalAuthorImg.src = testimonial.image + '.png';
                        modalAuthorImg.alt = testimonial.altText;
                        modalAuthorName.textContent = testimonial.name;
                        modalReviewText.textContent = testimonial.fullText;
                        modal.classList.remove('hidden');
                    });
                });
            });

        modalClose.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        window.addEventListener('click', e => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
});

// About Us секції
document.addEventListener('DOMContentLoaded', function() {
    fetch('/about-us-json/')
        .then(response => response.json())
        .then(data => {
            const sections = data.sections;

            const hasAboutUsSections = sections.some(section => document.querySelector(`#${section.id}`));
            if (!hasAboutUsSections) return;

            sections.forEach(section => {
                if (!section.id) {
                    console.error('Section id is missing:', section);
                    return;
                }

                const sectionElement = document.querySelector(`#${section.id}`);
                
                if (sectionElement) {
                    sectionElement.innerHTML = '';

                    const header = document.createElement('h1');
                    header.classList.add('about-us-section-header');
                    header.textContent = section.header;
                    sectionElement.appendChild(header);

                    const description = document.createElement('p');
                    description.classList.add('about-us-section-description');
                    description.textContent = section.description;
                    sectionElement.appendChild(description);

                    const cardsContainer = document.createElement('div');
                    cardsContainer.classList.add('about-us-cards-container');

                    section.cards.forEach(card => {
                        const cardElement = document.createElement('div');
                        cardElement.classList.add('about-us-card');

                        const iconContainer = document.createElement('div');
                        iconContainer.classList.add('card-icon');

                        const svgContainer = document.createElement('div');
                        svgContainer.innerHTML = `
                            <svg class="icon">
                                <use href="${card.icon}"></use>
                            </svg>
                        `;
                        iconContainer.appendChild(svgContainer);
                        cardElement.appendChild(iconContainer);

                        const cardTitle = document.createElement('h2');
                        cardTitle.textContent = card.title;
                        cardElement.appendChild(cardTitle);

                        const cardText = document.createElement('p');
                        cardText.textContent = card.text;
                        cardElement.appendChild(cardText);

                        cardsContainer.appendChild(cardElement);
                    });

                    sectionElement.appendChild(cardsContainer);
                } else {
                    console.error(`Section with id ${section.id} not found in the HTML.`);
                }
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});

// Слайдер
document.addEventListener('DOMContentLoaded', () => {
    const loginMain = document.querySelector('main.login-main');
    if (!loginMain) return;

    const container = document.getElementById('testimonials-container');
    const leftButton = document.getElementById('slider-left');
    const rightButton = document.getElementById('slider-right');

    let currentIndex = 0;
    let cards = [];

    fetch('/testimonials-json/')
        .then(response => response.json())
        .then(data => {
            data.forEach(testimonial => {
                const card = document.createElement('div');
                card.className = 'testimonial-card';

                card.innerHTML = `
                    <div class="testimonial-main">
                        <p>${testimonial.previewText}</p>
                    </div>
                    <div class="testimonial-footer">
                        <div class="testimonial-author-info">
                            <div class="testimonial-author-img">
                                <picture>
                                    <source srcset="${testimonial.image}.webp" type="image/webp">
                                    <img src="${testimonial.image}.png" alt="${testimonial.altText}">
                                </picture>
                            </div>
                            <span class="testimonial-author-name">${testimonial.name}</span>
                        </div>
                        <button data-id="${testimonial.id}">Read Full Story</button>
                    </div>
                `;

                container.appendChild(card);
                cards.push(card);
            });

            updateSlider();
        });

    function updateSlider() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    leftButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - 1;
        }
        updateSlider();
    });

    rightButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    });
});

// Пароль
const passwordInput = document.getElementById('password');
const eyeOpened = document.getElementById('eye-opened');
const eyeClosed = document.getElementById('eye-closed');

if (passwordInput && eyeOpened && eyeClosed) {
    function togglePasswordVisibility() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeOpened.classList.add('eye-hidden');
            eyeClosed.classList.remove('eye-hidden');
        } else {
            passwordInput.type = 'password';
            eyeOpened.classList.remove('eye-hidden');
            eyeClosed.classList.add('eye-hidden');
        }
    }

    eyeOpened.addEventListener('click', togglePasswordVisibility);
    eyeClosed.addEventListener('click', togglePasswordVisibility);
}
