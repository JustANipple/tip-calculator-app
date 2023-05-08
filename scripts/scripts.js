/*
TO_DO:
Bill input validation
People number input validation
Tip percentage selection
Tip percentage hover state
Tip custom percentage validation
Reset unlocks when at least one of the inputs are filled
Reset hover state
Amounts update if inputs are all true
*/

const billInput = document.querySelector(".compile_input");

billInput.addEventListener("change", () => {
    checkInput(billInput);
});

function checkInput(obj) {
    if(obj.validate.valid()) {
        obj.style.border = "1px solid green";
    }
}