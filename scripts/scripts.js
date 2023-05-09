/*
TO_DO:
Tip percentage hover state
Tip custom percentage validation
Reset unlocks when at least one of the inputs are filled
Reset hover state
Amounts update if inputs are all true
*/



/* === Bill and People number Input === */
const inputElems = document.querySelectorAll(".compile_input");
//if you need to pass an argument to the function you're calling, use the arrow function so that the function doesn't get instantly called
for(const elem of inputElems) {
    elem.addEventListener("change", () => {
        checkInput(elem);
    });
}
function checkInput(obj) {
    const errorLabel = obj.parentElement.parentElement.querySelector(".label_error");
    obj.parentElement.style.transition = "all .5s ease-in-out";
    errorLabel.style.transition = "all .5s ease-in-out";
    //to check if element is valid, just pass the element, not his value
    if(obj.checkValidity()) {
        obj.parentElement.setAttribute("id", "inputValid");
        errorLabel.style.visibility = "hidden";
        errorLabel.style.opacity = "0";
    } else {
        obj.parentElement.setAttribute("id", "inputInvalid");
        errorLabel.style.visibility = "visible";
        errorLabel.style.opacity = "1";
    }
}

/* === Tip percentage selection, validation === */
const percentageElems = document.querySelectorAll(".tip_percentage");
for(const percentage of percentageElems) {
    percentage.style.transition = "all .5s ease-in-out";
    percentage.addEventListener("click", () => {
        changeStatus(percentage);
    })
    //??
    percentage.addEventListener("mouseover", () => {
        //percentage.style.backgroundColor = "hsla(172, 67%, 45%, .5)";
    });
    percentage.addEventListener("mouseout", () => {
        percentage.style.filter = "brightness(1)";
    });
}

let chosen;
function changeStatus(obj) {
    obj.setAttribute("id", "chosen");
    if(chosen === obj) {
        chosen = undefined;
        obj.setAttribute("id", "");
    } else if(chosen === undefined) {
        chosen = obj;
    } else {
        chosen.setAttribute("id", "");
        chosen = obj;
    }
}

const customPerc = document.querySelector(".tip_custom");

customPerc.addEventListener("change", () => {
    checkCustomPerc(customPerc);
});

function checkCustomPerc(obj) {
    obj.style.transition = "all .5s ease-in-out";
    //to check if element is valid, just pass the element, not his value
    if(obj.checkValidity()) {
        obj.setAttribute("id", "inputValid");
    } else {
        obj.setAttribute("id", "inputInvalid");
    }
}



