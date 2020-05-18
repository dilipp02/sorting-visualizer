const area = document.querySelector('.bars');
const bars = document.querySelectorAll('.bar');
const sizeAndSpeed = document.getElementById('sizeAndSpeed');
const navButtons = document.querySelectorAll('.navbar button');
const flowButtons = document.querySelectorAll('.flowControl button');
const windowWidth = area.offsetWidth;
const windowHeight = area.offsetHeight;
let sortingType, arrayValue, sorting, barWidth, heights;

function generateArray() {
    heights = [];
    for(let i=0 ; i<arrayValue ; i++){
        let tmp = Math.round(Math.random() * windowHeight);
        heights.push(tmp >= 15 ? tmp : 15);
    }
}

function drawArray() {
    area.innerHTML = "";
    heights.forEach(height => {
        area.innerHTML += `
            <div class="bar" style="height: ${height}px; width: ${barWidth-3}px;"></div>
        `;
    });
}

function init() {
    sortingType = "bubble";
    arrayValue = sizeAndSpeed.value;
    sorting = false;
    barWidth = Math.round((windowWidth) / arrayValue);
    generateArray(arrayValue);
    drawArray(heights);
    flowButtons.forEach(button => button.disabled = true);
}

function disableButtons () {
    navButtons.forEach(button => {
        if(button.id === "newArr" || button.id === "sort")
            button.disabled = true;
    });
    sizeAndSpeed.disabled = true;
}

function enableButtons () {
    navButtons.forEach(button => {
        if(button.id === "newArr" || button.id === "sort")
            button.disabled = false;
    });
    sizeAndSpeed.disabled = false;
}

function handleSize (e) {
    if(arrayValue != e.target.value){
        arrayValue = e.target.value;
        barWidth = Math.round((windowWidth) / arrayValue);
        generateArray(arrayValue);
        drawArray(heights);
    }
}

function buttonClickHandle (e) {
    const eventTriggered = e.target.id;
    if(eventTriggered === "newArr"){
        generateArray();
        drawArray();
    }
    else if (eventTriggered === "sort"){
        disableButtons();
        flowButtons.forEach(button => button.disabled = false);
        if(sortingType === "bubble"){
            bubbleSort(barWidth)
                .then(() => {
                    enableButtons();
                    flowButtons.forEach(button => button.disabled = true);
                });
        }
        else if(sortingType === "merge"){
            mergeSort(barWidth)
                .then(() => {
                    enableButtons();
                    flowButtons.forEach(button => button.disabled = true);
                });
        }
        else if(sortingType === "quick"){
            quickSort(barWidth)
                .then(() => {
                    enableButtons();
                    flowButtons.forEach(button => button.disabled = true);
                });
        }
        else {
            selectionmergeSort(barWidth)
                .then(() => {
                    enableButtons();
                    flowButtons.forEach(button => button.disabled = true);
                });
        }
    }
    else {
        sortingType = eventTriggered;
        navButtons.forEach(button => {
            button.classList.remove("active");
            if(button.id === eventTriggered)
                button.classList.add("active");
        });
    }
}

init();
console.log(heights);
quickRec(0, heights.length - 1);
console.log(heights);

sizeAndSpeed.addEventListener('mousemove', handleSize);
sizeAndSpeed.addEventListener('change', handleSize);

navButtons.forEach(element => element.addEventListener('click', buttonClickHandle));