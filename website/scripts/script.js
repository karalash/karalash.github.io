const burgerMenu = document.querySelector('.burger-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

if (burgerMenu && offScreenMenu) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        offScreenMenu.classList.toggle('active');
    });
}

function showDialog() {
    document.getElementById('videoDialog').style.display = 'flex';
    document.getElementById('youtube-video').src = "https://www.youtube.com/embed/NMfMRrfWyD8?enablejsapi=1";
}

function closeDialog() {
    document.getElementById('videoDialog').style.display = 'none';
    document.getElementById('youtube-video').src = "";
}

function changeImage(imageName, reviewerName, reviewText) {
    document.getElementById('author-avatar').src = 'media/images/' + imageName;
    document.getElementById('reviewer-name').innerText = reviewerName;
    document.getElementById('review-text').innerText = reviewText;
}

const reviews = [
    {
        name: "Andrii Danylik",
        text: "The mobile applications were well-received and caused an uptick in the partner’s revenue. Devlight was a true partner that was always ready to help resolve problems. They were attentive and proactive about offering solution suggestions. The project manager excelled at coordinating multiple teams.",
        authorImg: "media/images/author1.png",
        authorImgWebp: "media/images/author1.webp",
        companyLogo: "media/images/nova-poshta-icon.png",
        companyLogoWebp: "media/images/nova-poshta-icon.webp"
    },
    {
        name: "Dmytro Koval",
        text: "When we were looking for a partner for our product research task, experience in similar tasks was essential for us to, as well as experience in the field of financial technologies. Devlight fully met our requirements, and cooperation with them exceeded all our expectations.",
        authorImg: "media/images/author2.png",
        authorImgWebp: "media/images/author2.webp",
        companyLogo: "media/images/vodafone-icon.png",
        companyLogoWebp: "media/images/vodafone-icon.webp"
    },
    {
        name: "Iryna Ivanova",
        text: "Cooperation with Devlight is essential for Sense Bank. Their swift augmentation of our team with skilled professionals, commitment to quality, and innovative approach led to the successful development of our digital banking app. Devlight’s expertise, effective communication, and after-hours dedication impressed us profoundly, making our collaboration a standout success.",
        authorImg: "media/images/author3.png",
        authorImgWebp: "media/images/author3.webp",
        companyLogo: "media/images/sense-bank-icon.png",
        companyLogoWebp: "media/images/sense-bank-icon.webp"
    },
    {
        name: "Sergiej Rewiakin",
        text: "Devlight has a talented design team, much better than any other UI/UX mobile designers I’ve ever worked with.",
        authorImg: "media/images/author4.png",
        authorImgWebp: "media/images/author4.webp",
        companyLogo: "media/images/movinga-icon.png",
        companyLogoWebp: "media/images/movinga-icon.webp"
    },
    {
        name: "Olha Semchyk",
        text: "Devlight’s team was flexible and fast, and communication was simple. The apps work well, and the Devlight team held to all deadlines. The team is talented, and they utilize non-mainstream, top-notch techniques.",
        authorImg: "media/images/author5.png",
        authorImgWebp: "media/images/author5.webp",
        companyLogo: "media/images/fishka-icon.png",
        companyLogoWebp: "media/images/fishka-icon.webp"
    }
];

document.querySelectorAll('.radio-group input').forEach((radio, index) => {
    radio.addEventListener('change', () => {
        document.getElementById('author-name').textContent = reviews[index].name;
        document.getElementById('review-text').textContent = reviews[index].text;
        document.getElementById('author-img').src = reviews[index].authorImg;
        document.getElementById('author-img-webp').srcset = reviews[index].authorImgWebp;
        document.getElementById('app-icon').src = reviews[index].companyLogo;
        document.getElementById('app-icon-webp').srcset = reviews[index].companyLogoWebp;
    });
});