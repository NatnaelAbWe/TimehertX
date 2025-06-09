// get elements from the html 
const darkLightToggle = document.getElementById('darkModeToggle');
const body = document.body

function Darklight(){
    // when the toggle is clicked
    if(this.checked){
        body.classList.add('dark-mode')
    }
    else {
        body.classList.remove('dark-mode');
        // localStorage.setItem('darkMode', 'disabled');
    }
}

darkLightToggle.addEventListener('change', Darklight)