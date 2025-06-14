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
    console.log('Puter.js loaded:', typeof window.puter !== 'undefined' ? 'loaded' : 'not loaded');
    const audienceToggle = document.getElementById('audienceToggle');
    const studentContent = document.querySelector('.content.students');
    const mentorContent = document.querySelector('.content.mentors');
    const signInButton = document.getElementById('sign-in');
    const chatStatusDiv = document.getElementById('chat-status');

    audienceToggle.addEventListener('change', function() {
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

    // Authentication handling
    async function updateAuthUI() {
        try {
            const isSignedIn = await puter.auth.isSignedIn();
            console.log('Authentication status:', isSignedIn ? 'Signed in' : 'Not signed in');
            if (isSignedIn) {
                if (chatStatusDiv) chatStatusDiv.textContent = 'Ready to chat!';
                if (signInButton) signInButton.style.display = 'none';
                sendButton.disabled = false;
            } else {
                if (chatStatusDiv) chatStatusDiv.textContent = 'Please sign in to use the chatbot.';
                if (signInButton) signInButton.style.display = 'block';
                sendButton.disabled = true;
            }
        } catch (error) {
            console.error('Error checking auth status:', error.message);
            if (chatStatusDiv) chatStatusDiv.textContent = 'Authentication error. Try signing in.';
        }
    }

    if (signInButton) {
        signInButton.addEventListener('click', async () => {
            try {
                console.log('Initiating Puter.js sign-in...');
                await puter.auth.signIn();
                await updateAuthUI();
            } catch (error) {
                console.error('Sign-in failed:', error.message);
                if (chatStatusDiv) chatStatusDiv.textContent = 'Sign-in failed. Try again.';
            }
        });
    }

    await updateAuthUI();

    // Load context dynamically for bonus points
    let systemPrompt = '';
    try {
        console.log('Attempting to fetch context.txt...');
        const response = await fetch('./context.txt');
        if (!response.ok) {
            throw new Error(`Failed to fetch context.txt: ${response.status} ${response.statusText}`);
        }
        systemPrompt = await response.text();
        console.log('context.txt fetched successfully:', systemPrompt.slice(0, 100) + '...');
    } catch (error) {
        console.error('Error loading context:', error.message);
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
            - Natnael Abnew (CEO): A visionary leader from Addis Ababa, Ethiopia, with a background in computer science and a passion for educational reform. He founded TimehertX to bridge the education gap in Ethiopia.
            - Abdi Tesfaye (UI/UX Designer): Specializes in creating user-friendly interfaces, ensuring TimehertX’s platform is accessible and engaging.
            - Meron Fikru (Content Manager): Crafts educational content that inspires and educates students across Ethiopia.
            - Hana Mekonnen (Lead AI Developer): Leads the development of TimehertX’s AI-powered learning assistant, with expertise in machine learning.
            
            Contact:
            - Use the contact form on our website (name, email, message, terms acceptance)
            - Reach out via social media: Facebook, Instagram, X, LinkedIn, YouTube
            
            Vision:
            To revolutionize education in Ethiopia by leveraging technology to create inclusive, innovative, 
            and excellent learning opportunities for all.
        `;
        console.log('Using fallback context');
    }

    // Function to add a message to the chat window with emojis
    function addMessage(content, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-bubble', sender);
        const emoji = sender === 'user' ? '🧑 ' : '🤖 ';
        messageElement.textContent = `${emoji}${content}`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Function to get fallback response
    function getFallbackResponse(message) {
        message = message.toLowerCase();
        if (message.includes('founded') || message.includes('founder')) {
            return 'TimehertX was founded by Natnael Abnew, who serves as the CEO and drives our mission to transform education in Ethiopia.';
        } else if (message.includes('natnael abnew')) {
            return 'Natnael Abnew is the CEO of TimehertX, a visionary leader from Addis Ababa, Ethiopia, with a background in computer science and a passion for educational reform.';
        } else if (message.includes('problem')) {
            return 'TimehertX addresses the lack of accessible, high-quality education in Ethiopia by providing technology-driven learning solutions.';
        } else if (message.includes('service') || message.includes('product')) {
            return 'We offer IT courses, university entrance exam prep, flexible online degree programs, and an AI-powered learning assistant with 24/7 support and personalized learning paths.';
        } else if (message.includes('contact')) {
            return 'You can contact us via the contact form on our website or on social media: Facebook, Instagram, X, LinkedIn, and YouTube.';
        } else if (message.includes('vision')) {
            return 'Our vision is to revolutionize education in Ethiopia with technology to create inclusive learning opportunities.';
        } else {
            return 'I’m here to help! Ask about TimehertX’s founder, services, problems we solve, contact info, or vision.';
        }
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
        sendButton.disabled = true;

        try {
            console.log('Calling puter.ai.chat with prompt:', userMessage);
            // Create full prompt
            const fullPrompt = `${systemPrompt}\n\nUser question: ${userMessage}\n\nRespond as TimehertX's AI assistant, providing accurate and helpful information.`;
            
            // Use Puter.js AI chat function
            const response = await puter.ai.chat(fullPrompt, {
                model: 'gpt-4',
                temperature: 0.7,
                max_tokens: 150
            });
            console.log('API response:', response);

            // Check response format
            const responseText = response && response.message ? response.message : response;
            if (!responseText || typeof responseText !== 'string') {
                throw new Error('Invalid response from Puter.js');
            }

            addMessage(responseText, 'ai');
        } catch (error) {
            console.error('Chat error:', error.message);
            // Use fallback response
            const fallbackResponse = getFallbackResponse(userMessage);
            addMessage(fallbackResponse, 'ai');
        }

        sendButton.disabled = false;
    }

    // Add button listeners
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
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
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const termsChecked = document.getElementById('terms').checked;

        if (name === '' || email === '' || message === '') {
            alert('Please fill out all fields.');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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