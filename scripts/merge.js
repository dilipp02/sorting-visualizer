let speedMs;

async function merge (low, mid, high) {
    const bars = document.querySelectorAll('.bar');
    let arrLeft = [], arrRight = [], i, j, k;
    const n1 = mid - low + 1;
    const n2 = high - mid;
    
    for(i=0 ; i<n1 ; i++)
        arrLeft.push(parseInt(bars[low + i].style.height));
    for(j=0 ; j<n2 ; j++)
        arrRight.push(parseInt(bars[mid + 1 + j].style.height));
    
    i=0;
    j=0;
    k=0;

    while(i < n1 && j < n2){
        bars[low + i].style.backgroundColor = secondary_color;
        bars[mid + 1 + j].style.backgroundColor = secondary_color;
        await sleep(speedMs);
        if(control == "pause") {
            await pauseHandler();
            if(isForward)
                isForward = false;
        }
        bars[low + i].style.backgroundColor = primary_color;
        bars[mid + 1 + j].style.backgroundColor = primary_color;

        if(arrLeft[i] <= arrRight[j]) {
            bars[low+k].style.height = `${arrLeft[i]}px`;
            i++;
        }
        else {
            bars[low+k].style.height = `${arrRight[j]}px`;
            j++;
        }
        k++;
    }
    
    while(i < n1){
        bars[low + i].style.backgroundColor = secondary_color;
        await sleep(speedMs);
        if(control == "pause") {
            await pauseHandler();
            if(isForward)
                isForward = false;
        }
        bars[low + i].style.backgroundColor = primary_color;

        bars[low+k].style.height = `${arrLeft[i]}px`;
        i++;
        k++;
    }

    while(j < n2){
        bars[mid + 1 + j].style.backgroundColor = secondary_color;
        await sleep(speedMs);
        if(control == "pause") {
            await pauseHandler();
            if(isForward)
                isForward = false;
        }
        bars[mid + 1 + j].style.backgroundColor = primary_color;
        
        bars[low+k].style.height = `${arrRight[j]}px`;
        j++;
        k++;
    }
}

async function mergeRec (low, high) {
    if (low == high)
        return;
    const mid = Math.floor((low + high) / 2);
    await mergeRec(low, mid);
    await mergeRec(mid+1, high);
    await merge(low, mid, high);
}

async function mergeSort (speed) {
    const bars = document.querySelectorAll('.bar');
    forward.disabled = true;
    control = "play";
    isForward = false;
    speedMs = speed;
    await mergeRec(0, bars.length - 1);
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