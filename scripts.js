// Get elements
const darkLightToggle = document.getElementById('darkModeToggle');
const body = document.body;
const faqQuestions = document.querySelectorAll('.faq-question');
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
const backToTopButton = document.getElementById('backToTop');
const counterElement = document.getElementById('visitorCounter');

// Dark Mode Toggle
function Darklight() {
    if (this.checked) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}
darkLightToggle.addEventListener('change', Darklight);

// FAQ toggle
function toggleFaq() {
    this.parentElement.classList.toggle('active');
}
faqQuestions.forEach(question => {
    question.addEventListener('click', toggleFaq);
});

// Audience toggle and Chatbot
document.addEventListener('DOMContentLoaded', async () => {
    const audienceToggle = document.getElementById('audienceToggle');
    const studentContent = document.querySelector('.content.students');
    const mentorContent = document.querySelector('.content.mentors');

    audienceToggle.addEventListener('change', function () {
        if (this.checked) {
            studentContent.classList.remove('active');
            mentorContent.classList.add('active');
        } else {
            mentorContent.classList.remove('active');
            studentContent.classList.add('active');
        }
    });

    // Chatbot elements
    const sendButton = document.getElementById('sendButton');
    const chatInput = document.getElementById('chatInput');
    const chatWindow = document.getElementById('chatWindow');

    // Sample questions
    const sampleQuestionButtons = document.querySelectorAll('.sample-question');
    sampleQuestionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const question = button.textContent;
            chatInput.value = question;
            sendMessage();
        });
    });

    // Load context dynamically for bonus points
    let systemPrompt = '';
    try {
        const response = await fetch('./context.txt'); // Adjust path if needed
        if (!response.ok) {
            throw new Error('Failed to load context');
        }
        systemPrompt = await response.text();
    } catch (error) {
        console.error('Error loading context:', error);
        // Fallback hardcoded context
        systemPrompt = `
            TimehertX is an innovative online learning platform founded by Natnael Abnew in Ethiopia. 
            Our mission is to transform education by providing accessible, high-quality learning experiences 
            to empower students to reach their full potential. We address the lack of quality education 
            and limited access to resources in Ethiopia through technology-driven solutions.
            
            Services and products:
            - IT courses for future innovators
            - University entrance exam preparation
            - Flexible online degree programs
            - AI-powered learning assistant with 24/7 support and personalized learning paths
            
            Team:
            - Natnael Abnew (CEO)
            - Abdi Tesfaye (UI/UX Designer)
            - Meron Fikru (Content Manager)
            - Hana Mekonnen (Lead AI Developer)
            
            Contact:
            - Use the contact form on our website (name, email, message, terms acceptance)
            - Reach out via social media: Facebook, Instagram, X, LinkedIn, YouTube
            
            Vision:
            To revolutionize education in Ethiopia by leveraging technology to create inclusive, innovative, 
            and excellent learning opportunities for all.
        `;
    }

    // Function to add a message to the chat window
    function addMessage(content, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-bubble', sender);
        messageElement.textContent = content;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Function to send message to Puter.js AI
    async function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") {
            addMessage("Please enter a question.", 'ai');
            return;
        }

        // Display user message
        addMessage(userMessage, 'user');
        chatInput.value = "";

        try {
            // Use Puter.js AI chat function
            const response = await puter.ai.chat({
                prompt: userMessage,
                systemPrompt: systemPrompt,
                max_tokens: 150
            });

            if (!response || typeof response !== 'string') {
                throw new Error('Invalid response from Puter.js');
            }

            addMessage(response, 'ai');
        } catch (error) {
            console.error('Error:', error);
            addMessage("Oops, something went wrong. Please try again!", 'ai');
        }
    }

    // Add button listeners
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// Testimonials Carousel
let currentIndex = 0;

function updateCarousel() {
    testimonials.forEach((testimonial, index) => {
        testimonial.classList.toggle('active', index === currentIndex);
        dots[index].classList.toggle('active', index === currentIndex);
    });
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Visitor Counter
let visitCount = localStorage.getItem('visitCount');
if (!visitCount) {
    visitCount = 0;
}
visitCount++;
localStorage.setItem('visitCount', visitCount);
counterElement.textContent = `You have visited this site ${visitCount} ${visitCount === 1 ? 'time' : 'times'}.`;

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const termsChecked = document.getElementById('terms').checked;

        if (name === '' || email === '' || message === '') {
            alert('Please fill out all fields.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!termsChecked) {
            alert('You must accept the Terms.');
            return;
        }

        alert('Thank you for your message! We will contact you soon.');
        contactForm.reset();
    });
}

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});