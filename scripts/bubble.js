const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const forward = document.querySelector('.forward');
const primary_color = "mediumorchid";
const secondary_color = "red";
const success_color = "green";
const temp_color = "yellow";
const min_color = "gold";
let control = "play";
let isForward = false;

function sleep (ms) {
    return new Promise((res, req) => setTimeout(res, ms));
}

async function pauseHandler () {
    while (control != "play" && !isForward )
        await sleep(1);
    return;
}

async function bubbleSort (speed) {
    const bars = document.querySelectorAll('.bar');
    forward.disabled = true;
    const len = bars.length;
    let height1, height2;
    control = "play";
    isForward = false;

    for(let i=0 ; i<len-1 ; i++){
        for(let j=0 ; j<len-i-1 ; j++){
            height1 = parseInt(bars[j].style.height);
            height2 = parseInt(bars[j+1].style.height);
            bars[j].style.backgroundColor = secondary_color;
            bars[j+1].style.backgroundColor = secondary_color;
            
            await sleep(speed);
            if(control == "pause"){
                await pauseHandler();
                if(isForward)
                    isForward = false;
            }

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

play.addEventListener('click', () => {
    control = "play";
    forward.disabled = true;
});
pause.addEventListener('click', () => {
    control = "pause";
    forward.disabled = false;
});
forward.addEventListener('click', () => isForward = true);