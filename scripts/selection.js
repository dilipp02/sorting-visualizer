async function selectionSort (speed) {
    const bars = document.querySelectorAll('.bar');
    forward.disabled = true;
    const len = bars.length;
    let height1, height2;
    control = "play";
    isForward = false;

    for(let i=0 ; i<len-1 ; i++) {
        let minInd = i;
        let minVal = parseInt(bars[i].style.height);
        bars[i].style.backgroundColor = temp_color;
        await sleep(speed);
        if(control == "pause"){
            await pauseHandler();
            if(isForward)
                isForward = false;
        }

        for(let j=i+1 ; j<len ; j++) {
            const heightj = parseInt(bars[j].style.height);
            bars[j].style.backgroundColor = secondary_color;

            await sleep(speed);
            if(control == "pause"){
                await pauseHandler();
                if(isForward)
                    isForward = false;
            }

            if(heightj < minVal) {
                bars[minInd].style.backgroundColor = (minInd == i) ? temp_color : primary_color;
                await sleep(speed);
                if(control == "pause"){
                    await pauseHandler();
                    if(isForward)
                    isForward = false;
                }
                minVal = heightj;
                minInd = j;
                bars[minInd].style.backgroundColor = (minInd == i) ? temp_color : min_color;
                await sleep(speed);
                if(control == "pause"){
                    await pauseHandler();
                    if(isForward)
                    isForward = false;
                }
            }
            bars[j].style.backgroundColor = (j == minInd) ? min_color : primary_color;
        }
        const heighti = parseInt(bars[i].style.height);
        const heightMin = parseInt(bars[minInd].style.height);
        [bars[i].style.height, bars[minInd].style.height] = [`${heightMin}px`, `${heighti}px`];
        bars[minInd].style.backgroundColor = primary_color;
        bars[i].style.backgroundColor = success_color;
    }
    bars[len-1].style.backgroundColor = success_color;
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