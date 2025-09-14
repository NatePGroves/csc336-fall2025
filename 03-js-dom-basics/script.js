

function showMenu() {
    document.getElementById("menu").classList.add("show");
    document.getElementById("overlay").classList.add("show");
    document.getElementById("main-page").classList.add("oof");
}

function closeMenu() {
    document.getElementById("menu").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
    document.getElementById("main-page").classList.remove("oof");
}

function incorrect(){

}

function correct(){

}

function checkAnswer(answer) {
    if (answer == true){
        correct()
    }else{
        incorrect()
    }
}