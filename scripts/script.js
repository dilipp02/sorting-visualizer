const area = document.querySelector('.bars');
const bars = document.querySelectorAll('.bar');
const sizeAndSpeed = document.getElementById('sizeAndSpeed');
const allButtons = document.querySelectorAll('button');
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
    arrayValue = 100;
    sorting = false;
    barWidth = Math.round((windowWidth) / arrayValue);
    generateArray(arrayValue);
    drawArray(heights);
}

function disableButtons () {
    allButtons.forEach(button => {
        if(button.id === "newArr" || button.id === "sort")
            button.disabled = true;
    });
    sizeAndSpeed.disabled = true;
}

function enableButtons () {
    allButtons.forEach(button => {
        if(button.id === "newArr" || button.id === "sort")
            button.disabled = false;
    });
    sizeAndSpeed.disabled = false;
}

function handleSize (e) {
    if(arrayValue != e.target.value){
        // console.log(e.target.value);
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
        if(sortingType === "bubble"){
            bubbleSort(barWidth)
                .then(() => enableButtons());
        }
        // else if(sortingType === "merge"){
        //     mergeSort(barWidth)
        //         .then(() => enableButtons());
        // }
        // else if(sortingType === "quick"){
        //     quickSort(barWidth)
        //         .then(() => enableButtons());
        // }
        // else {
        //     heapmergeSort(barWidth)
        //         .then(() => enableButtons());
        // }
    }
    else {
        sortingType = eventTriggered;
        allButtons.forEach(button => {
            button.classList.remove("active");
            if(button.id === eventTriggered)
                button.classList.add("active");
        });
    }
}

init();

sizeAndSpeed.addEventListener('mousemove', handleSize);
sizeAndSpeed.addEventListener('change', handleSize);

allButtons.forEach(element => element.addEventListener('click', buttonClickHandle));