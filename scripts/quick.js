const temp_color = "yellow";
let partitionAt;

async function partition (low, high) {
    const bars = document.querySelectorAll('.bar');
    // console.log(bars[high]);
    const pivot = parseInt(bars[high].style.height);
    bars[high].style.backgroundColor = temp_color;
    let i=low-1, heighti, heightj;
    // console.log(low, high);
    for(let j=low ; j<high ; j++){
        heightj = parseInt(bars[j].style.height);

        bars[j].style.backgroundColor = secondary_color;
        bars[i + 1].style.backgroundColor = secondary_color;
        await sleep(speedMs);
        if(control == "pause") {
            await pauseHandler();
            if(isForward)
                isForward = false;
        }
        bars[j].style.backgroundColor = primary_color;
        bars[i + 1].style.backgroundColor = primary_color;
            
        if(heightj < pivot){
            i++;
            heighti = parseInt(bars[i].style.height);
            [bars[i].style.height, bars[j].style.height] = [`${heightj}px`, `${heighti}px`];
        }

    }
    i++;
    heighti = parseInt(bars[i].style.height);
    
    [bars[i].style.height, bars[high].style.height] = [`${pivot}px`, `${heighti}px`];
    bars[high].style.backgroundColor = success_color;
    partitionAt = i;
}

async function quickRec (low, high) {
    if(low >= high)
        return;
    await partition(low, high);
    await quickRec(low, partitionAt-1);
    await quickRec(partitionAt+1, high);
}

async function quickSort (speed) {
    const bars = document.querySelectorAll('.bar');
    forward.disabled = true;
    control = "play";
    isForward = false;
    speedMs = speed;
    await quickRec(0, bars.length - 1);
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
