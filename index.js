var horizontal=false;
var delay = 40;
var loopround = [0]
var multiplier = 1;

// var onetime=true
var unSorted=false;
var numArr = [];
var play = false;
var l, r;


//Starter Function
intial();

//Utility Function

function enableSort() {
    document.getElementById("sort-btn").innerHTML = "Sort";
    document.getElementById("sort-btn").removeAttribute("disabled");
}

function disableSort() {
    document.getElementById("sort-btn").innerHTML = "Disabled";
    document.getElementById("sort-btn").setAttribute("disabled", null);
}



function updatenumArr(val){
    var selection = document.getElementsByTagName("select")[1].selectedIndex
    switch (parseInt(selection)) {
        // case 0-1:
        //     Fibonacci(val);
        //     break;
        case 0:
            Prime(val);
            break;
        case 1:
            Random(val);
            break;
        case 2:
            Linear(val);
            break;
        case 3:
            Square(val);
            break;

        case 4:
            Cube(val);
            break;
    }
}

function arraySizeUpdate(val) {
    loopround = 0;
    numArr = [];
    updatenumArr(val);
    max = Math.max(...numArr);
    numArr = shuffle();
    unSorted=true;
    finishSort();
}

function sizeSliderUpdate(val) {
    document.getElementById('number-value').innerHTML = "Array Size: " + val;
}

function shufflenumArray() {
    finishSort();
    arraySizeUpdate(document.getElementById("number-slider").value);
    unSorted=true;
    printChartOnly();
}
function shuffle() {
    var m = numArr.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = numArr[m];
        numArr[m] = numArr[i];
        numArr[i] = t;
    }
    return numArr;
}

function togglePlay() {
    play = !play;
    document.getElementById("sort-btn").innerHTML = play ? "Pause" : "Sort";
}
function finishSort() {
    printChartOnly();
    loopround = 0;
    enableSort();
    play = false;
}

function delayUpdate(val) {
    delay = val * multiplier;
    document.getElementById('delayValue').innerHTML = "Delay: " + val * multiplier + " ms";
}


/*****************************Sorting Function *************************/

async function sort() {
    togglePlay();
    if (play) {
        delay = document.getElementById("delay-slider").value * multiplier;
        var selection = document.getElementsByTagName("select")[0].selectedIndex
        switch (parseInt(selection)) {
            case 0:
                BubbleSort(loopround);
                break;
                
            case 1:
                selectionSort(loopround);
                break;
                
            case 2:
                insertionSort(loopround);
                break;
            case 3:
                disableSort();
                mergeSort(0, numArr.length - 1);
                break;
            case 4:
                disableSort();
                await quickSort(0, numArr.length - 1);
                printChartOnly();
                finishSort();
                break;

            case 5:
                disableSort();
                heapSort(numArr.length);
                break;
        }
    }
}


//Quicksort
async function quickSort(l, r) {
    if (l < r) {
        var p = await partition(l, r);
        printRangeCurr(l, r, p);
        await sleep(delay);
        await quickSort(l, p - 1);
        await quickSort(p + 1, r);
    }
}
async function partition(l, r) {
    var p = l;
    while (l < r) {
        while (numArr[l] < numArr[p]) {
            l++;
        }
        while (numArr[r] > numArr[p]) {
            r--;
        }
        if (l < r)
            swap(l, r);
    }
    swap(p, r);
    return r;
}

//HeapSort

async function heapify(n, i) {
    var largest = i; // Initialize largest as root 
    var l = 2 * i + 1; // left = 2*i + 1 
    var r = 2 * i + 2; // right = 2*i + 2 
    if (l < n && numArr[l] > numArr[largest])
        largest = l;
    if (r < n && numArr[r] > numArr[largest])
        largest = r;
    if (largest != i) {
        swap(i, largest);
        await heapify(n, largest);
    }
}

function swap(i1, i2) {
    temp = numArr[i1];
    numArr[i1] = numArr[i2];
    numArr[i2] = temp;
}

async function heapSort(n) {
    var i;
    for (i = n / 2 - 1; i >= 0; i--)
        await heapify(n, i);
    printRangeCurr(0, i, n);
    await sleep(delay / 2);
    for (i = n - 1; i >= 0; i--) {
        swap(0, i);
        await heapify(i, 0, i);
        printRangeCurr(0, i, i);
        await sleep(delay / 2);
    }
    printChartOnly();
    finishSort();
}
//Selection Sort

function selectionSort(loopround) {
    var j, pos;
    if (loopround >= numArr.length) {
        finishSort();
        return;
    } else {
        pos = loopround;
        for (j = loopround + 1; j < numArr.length; j++) {
            if (numArr[j] < numArr[pos]) {
                pos = j;
            }
        }
        printRangeCurr(loopround, numArr.length - 1, pos);
        swap(loopround, pos);
        if (play) {
            loopround += 1;
            setTimeout(() => selectionSort(loopround), delay);
        }
    }
}

//Bubble Sort

function BubbleSort(loopround) {
    if (loopround >= numArr.length - 1) {
        finishSort();
        return;
    }
    var pos = 0;
    for (j = 0; j < numArr.length; j++) {
        if (numArr[j] < numArr[j - 1]) {
            swap(j, j - 1);
            pos = j;
        }
    }
    printRangeCurr(0, pos, loopround);
    if (play) {
        loopround += 1;
        setTimeout(() => BubbleSort(loopround), delay);
    }
}

//Insertion Sort
function insertionSort(loopround) {
    if (loopround >= numArr.length) {
        finishSort();
        return;
    }
    var key = numArr[loopround];
    var j = loopround - 1;
    while (j >= 0 && numArr[j] > key) {
        numArr[j + 1] = numArr[j];
        j = j - 1;
    }
    numArr[j + 1] = key;
    printRangeCurr(loopround, numArr.length - 1, j);
    if (play) {
        loopround += 1;
        setTimeout(() => insertionSort(loopround), delay);
    }
}
//Merge Sort
async function merge(l, m, r) {
    var L = [],
        R = [],
        i, j, k;
    for (i = l; i <= m; i++)
        L.push(numArr[i]);
    for (i = m + 1; i <= r; i++)
        R.push(numArr[i]);

    for (i = l, j = 0, k = 0; i <= r && j <= m - l && k <= r - m - 1; i++) {
        if (L[j] < R[k])
            numArr[i] = L[j++];
        else
            numArr[i] = R[k++];
    }
    while (j <= m - l) {
        numArr[i++] = L[j++];
    }
    while (k <= r - m - 1) {
        numArr[i++] = R[k++];
    }
    if (l == 0 && r == numArr.length - 1) {
        finishSort();
    }
}


async function mergeSort(l, r) {

    if (l < r) {
        var m = parseInt((l + r) / 2);
        printRangeCurr(l, r);
        await sleep(delay / 3);
        await mergeSort(l, m); // merge sort
        printRangeCurr(l, m);
        await sleep(delay / 3);
        await mergeSort(m + 1, r);  // merge sOrt
        printRangeCurr(m + 1, r);
        await sleep(delay / 3);
        await merge(l, m, r);   // finally merge them
    }
}



/****************************Number Array Filling******************** */
function Prime(val){
    var j=2;
    console.log("HI");
    for (var i = 0; i < val; i++) {
        for(;j<2000;j++){
            flag=1;
            for(var k=2;k<j/2;k++){
                if(j%k==0){
                    flag=0;
                    break
                }
            }
            if(flag==1){
                numArr.push(j)
                // console.log(j)
                j++
                break
            }
            
        }
    }
}
function Random(val){  
     for (var i = 0; i < val; i++) {
    numArr.push(Math.random()*val);
    }

}
function Linear(val){
    for (var i = 0; i < val; i++) {
        // numArr.push(Math.random()*val);
        numArr.push(i+1);
    }
}
function Square(val){
    for (var i = 0; i < val; i++) {
        // numArr.push(Math.random()*val);
        numArr.push((i+1)*(i+1));
    }
}
function Cube(val){
    for (var i = 0; i < val; i++) {
        // numArr.push(Math.random()*val);
        numArr.push(Math.pow((i+1),3));
    }
}




/**************************Print Table Utility ****************************/
function printChartOnly() {
    document.getElementsByClassName("table")[0].innerHTML = "";
    var i;
    for (i = 0; i < numArr.length; i++) {
        print(numArr[i], max);
        if(unSorted)
         document.getElementsByClassName("bar")[i].classList.add("unsorted");
    }
    unSorted=false
}


function printRange(l, r) {
    var i;
    for (i = 0; i < numArr.length; i++) {
        if(horizontal){
            document.getElementsByClassName("bar")[i].setAttribute("style", "width: " + (numArr[i] / max * 100) + "%;");
        }
        else{
            document.getElementsByClassName("bar")[i].setAttribute("style", "height: " + (numArr[i] / max * 100) + "%;");
        }
        if (i >= l && i <= r) {
            document.getElementsByClassName("bar")[i].classList.add("unsorted");
        } else {
            document.getElementsByClassName("bar")[i].classList.remove("curr");
            document.getElementsByClassName("bar")[i].classList.remove("unsorted");
        }
    }
}

function printRangeCurr(l, r, curr) {
    var i;
    for (i = 0; i < numArr.length; i++) {
        if(horizontal){
            document.getElementsByClassName("bar")[i].setAttribute("style", "width: " + (numArr[i] / max * 100) + "%;");
        }
        else{
            document.getElementsByClassName("bar")[i].setAttribute("style", "height: " + (numArr[i] / max * 100) + "%;");
        }       
         if (i >= l && i <= r) {
            document.getElementsByClassName("bar")[i].classList.add("unsorted");
        } else {
            document.getElementsByClassName("bar")[i].classList.remove("curr");
            document.getElementsByClassName("bar")[i].classList.remove("unsorted");
        }
        if (i == curr) {
            document.getElementsByClassName("bar")[i].classList.remove("unsorted");
            document.getElementsByClassName("bar")[i].classList.add("curr");
        }

    }
}

function print(num, max) {
    if(horizontal){
        document.body.getElementsByClassName("table")[0].innerHTML += ("<div class='chart'><div class='bar' style='width: " + num / max * 100 + "%;'></div></div>");
    }
    else{
        document.body.getElementsByClassName("table")[0].innerHTML += ("<div class='chart'><div class='bar' style='height: " + num / max * 100 + "%;'></div></div>");
    }
    // unsorted=false
}


//Sleep Delay Utility
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//Intial CAll Function
document.querySelector(".table").classList.toggle('tableVert');
document.querySelector(".bar").classList.toggle('barVert');
function rotateDisplay(){
    document.querySelector(".table").classList.toggle('tableVert');
    document.querySelector(".bar").classList.toggle('barVert');
    horizontal=!horizontal;
    printChartOnly();
}

function intial(){   
    delayUpdate(document.getElementById("delay-slider").value);
    arraySizeUpdate(document.getElementById("number-slider").value);
    sizeSliderUpdate(document.getElementById("number-slider").value);
}