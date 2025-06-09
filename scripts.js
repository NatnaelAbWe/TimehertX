// get elements from the html 
const darkLightToggle = document.getElementById('darkModeToggle');
const body = document.body;
const faqQuestions = document.querySelectorAll('.faq-question');
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
const sendButton = document.getElementById('sendButton');
const chatInput = document.getElementById('chatInput');
const chatWindow = document.getElementById('chatWindow');

let currentIndex = 0;

function Darklight(){
    if(this.checked){
        body.classList.add('dark-mode')
    }
    else {
        body.classList.remove('dark-mode');
    }
}
darkLightToggle.addEventListener('change', Darklight)

// FAQ logic
function toggleFaq(){
    this.parentElement.classList.toggle('active')
}

faqQuestions.forEach(question => {
    question.addEventListener('click', toggleFaq);
});

document.addEventListener('DOMContentLoaded', () => {
    const audienceToggle = document.getElementById('audienceToggle');
    const studentContent = document.querySelector('.content.students');
    const mentorContent = document.querySelector('.content.mentors');

    audienceToggle.addEventListener('change', function() {
        if (this.checked) {
            studentContent.classList.remove('active');
            mentorContent.classList.add('active');
        } else {
            mentorContent.classList.remove('active');
            studentContent.classList.add('active');
        }
    });
});

function updateCarousel() {
    testimonials.forEach((testimonial, index) => {
        testimonial.classList.toggle('active', index === currentIndex);
        dots[index].classList.toggle('active', index === currentIndex);
    });
}

// next button
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateCarousel();
});

// Prev Button
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
});

// Add dot click functionality
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message !== '') {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.textContent = message;
        chatWindow.appendChild(messageDiv);
        chatInput.value = '';
        chatWindow.scrollTop = chatWindow.scrollHeight; // scroll to bottom
    }
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

const counterElement = document.getElementById('visitorCounter');
let visitCount = localStorage.getItem('visitCount');

if (!visitCount) {
    visitCount = 0;
}

visitCount++;

localStorage.setItem('visitCount', visitCount);
counterElement.textContent = `You have visited this site ${visitCount} ${visitCount === 1 ? 'time' : 'times'}.`;



