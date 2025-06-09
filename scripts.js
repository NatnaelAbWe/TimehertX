// get elements from the html 
const darkLightToggle = document.getElementById('darkModeToggle');
const body = document.body;
const faqQuestions = document.querySelectorAll('.faq-question');

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