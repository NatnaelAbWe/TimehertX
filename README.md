TimehertX
TimehertX is an innovative online learning platform designed to transform education in Ethiopia through technology-driven solutions. Our mission is to provide accessible, high-quality learning experiences to empower students to reach their full potential.
Live Demo

Live Site: https://username.github.io/timehertx/ (Replace with your actual GitHub Pages URL)
Figma Design: Insert Figma Link Here (Replace with your Figma link)

Project Overview
This project is a fully functional website for TimehertX, featuring:

A responsive design with dark mode toggle, audience switcher, and testimonials carousel.
A contact form with validation.
An AI-powered chatbot using Puter.js, answering questions about TimehertX’s story, services, and vision.
Dynamic context loading from context.txt for the chatbot (bonus feature).

Chatbot Q&A
The chatbot answers the following questions based on TimehertX’s context:

Who founded TimehertX?

Answer: TimehertX was founded by Natnael Abnew, who serves as the CEO and drives our mission to transform education in Ethiopia.


What problems does TimehertX solve?

Answer: TimehertX addresses the lack of accessible, high-quality education in Ethiopia by providing technology-driven learning solutions, tackling issues like limited resources and inadequate exam preparation.


What services or products does it offer?

Answer: We offer IT courses, university entrance exam prep, flexible online degree programs, and an AI-powered learning assistant with 24/7 support and personalized learning paths.


How can someone contact the team?

Answer: You can contact us via the contact form on our website, requiring your name, email, message, and terms acceptance. We’re also on social media: Facebook, Instagram, X, LinkedIn, and YouTube.


What is the startup’s long-term vision?

Answer: Our vision is to revolutionize education in Ethiopia by leveraging technology to create inclusive, innovative, and excellent learning opportunities for all.



Installation and Setup

Clone the Repository:
git clone https://github.com/username/timehertx.git
cd timehertx


Run Locally:

Use a local server (e.g., Python’s HTTP server or VS Code’s Live Server):python -m http.server 8000


Open http://localhost:8000 in your browser.


Dependencies:

No external dependencies required except the Puter.js library, loaded via CDN:<script src="https://js.puter.com/v2/"></script>





Project Structure
timehertx/
├── asset/
│   ├── img/
│   ├── icons/
│   ├── social media icons/
├── context.txt
├── index.html
├── scripts.js
├── styles.css
├── README.md


context.txt: Contains the chatbot’s system prompt for dynamic loading.
index.html: Main HTML file with all sections and chatbot UI.
scripts.js: Handles interactivity, including the Puter.js chatbot integration.
styles.css: Styles the website and chatbot, with dark mode support.

Deployment
The site is deployed on GitHub Pages:

Push changes to your repository:git add .
git commit -m "Update chatbot and deploy"
git push


Enable GitHub Pages in your repo settings (Settings > Pages > Source: main branch).
Access the live site at https://username.github.io/timehertx/.

Features

Responsive Design: Optimized for mobile and desktop.
Dark Mode: Toggle between light and dark themes.
Audience Switcher: Content tailored for students or mentors.
Chatbot: Powered by Puter.js, with sample questions and error handling.
Contact Form: Validates name, email, message, and terms acceptance.
Accessibility: Includes alt text for images.

Troubleshooting

Chatbot Error ("Oops, something went wrong"):
Ensure context.txt is in the root directory and accessible.
Check the browser’s Console and Network tabs for errors (e.g., Puter.js not loading).
Verify the Puter.js script is loaded before scripts.js.


Deployment Issues:
Confirm all files are committed and pushed.
Check GitHub Pages settings and clear browser cache.



Credits

Founder: Natnael Abnew
Team: Abdi Tesfaye (UI/UX Designer), Meron Fikru (Content Manager), Hana Mekonnen (Lead AI Developer)
Icons: Font Awesome (via SVG files)
Images: Unsplash

License
© 2025 TimehertX. All rights reserved.
