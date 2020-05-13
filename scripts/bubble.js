const primary_color = "mediumorchid";
const secondary_color = "red";
const success_color = "green";

function sleep (ms) {
    return new Promise((res, req) => setTimeout(res, ms));
}

async function bubbleSort (speed) {
    const bars = document.querySelectorAll('.bar');
    const len = bars.length;
    let height1, height2;
    for(let i=0 ; i<len-1 ; i++){
        for(let j=0 ; j<len-i-1 ; j++){
            height1 = parseInt(bars[j].style.height);
            height2 = parseInt(bars[j+1].style.height);
            bars[j].style.backgroundColor = secondary_color;
            bars[j+1].style.backgroundColor = secondary_color;
            await sleep(speed);
            if(height1 > height2)
                [bars[j].style.height, bars[j+1].style.height] = [`${height2}px`, `${height1}px`];
            bars[j].style.backgroundColor = primary_color;
            bars[j+1].style.backgroundColor = primary_color;
        }
        bars[len-i-1].style.backgroundColor = success_color;
    }
    bars[0].style.backgroundColor = success_color;
    await sleep(500);
    bars.forEach(bar => bar.style.backgroundColor = primary_color);
}