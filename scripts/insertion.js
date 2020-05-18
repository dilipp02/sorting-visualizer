async function insertionSort (speed) {
    const bars = document.querySelectorAll('.bar');
    forward.disabled = true;
    let heightj;
    const len = bars.length;
    control = "play";
    isForward = false;

    for(let i=1 ; i<len ; i++){
        const val = parseInt(bars[i].style.height);
        bars[i].style.backgroundColor = temp_color;
        await sleep(speed);
        if(control == "pause"){
            await pauseHandler();
            if(isForward)
                isForward = false;
        }

        let j = i-1;
        let heightj = parseInt(bars[j].style.height);
        while(j >= 0 && heightj > val) {
            bars[j].style.backgroundColor = secondary_color;
            bars[j+1].style.backgroundColor = secondary_color;
            await sleep(speed);
            if(control == "pause"){
                await pauseHandler();
                if(isForward)
                    isForward = false;
            }
            bars[j+1].style.height = `${heightj}px`;
            bars[j+1].style.backgroundColor = (j+1 == i) ? temp_color : primary_color;
            bars[j].style.backgroundColor = primary_color;
            await sleep(speed);
            if(control == "pause"){
                await pauseHandler();
                if(isForward)
                isForward = false;
            }
            j--;
            if(j >= 0)
                heightj = parseInt(bars[j].style.height);
        }
        bars[j+1].style.backgroundColor = (j+1 == i) ? temp_color : min_color;
        await sleep(speed);
        if(control == "pause"){
            await pauseHandler();
            if(isForward)
                isForward = false;
        }
        bars[j+1].style.height = `${val}px`;
        bars[j+1].style.backgroundColor = (j+1 == i) ? temp_color : primary_color;
        await sleep(speed);
        if(control == "pause"){
            await pauseHandler();
            if(isForward)
                isForward = false;
        }
    }
    // console.log(bars);
    bars.forEach(bar => bar.style.backgroundColor = success_color);
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