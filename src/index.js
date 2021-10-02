import {Prime,Random,Linear,Square,Cube} from './numberdistribution.js'
import {selectionSort,quickSort,BubbleSort,insertionSort,mergeSort} from './sort.js'
import {printChartOnly} from './printutility.js'
export var horizontal=false;
export var delay = 40;
export var loopround = 0
export var multiplier = 1;
export var max=0
export var unSorted=false;
export var numArr = [];
export var play = false;
export var l, r;
//DOM
const btnSort=document.getElementById("sort-btn");
const btnShuffle=document.getElementById("shuffle");
const selectShuffle=document.getElementById("selectShuffle");
const delaySlider=document.getElementById("delay-slider");
const rotateDisplay=document.getElementById("rotateDisplay");
const numberSLider=document.getElementById("number-slider");


/*****************************Sorting Utility Function *************************/
async function sort(){
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
                printChartOnly(); unSorted=false;;
                finishSort();
                break;
            // case 5:
            //     disableSort();
            //     heapSort(numArr.length);
            //     break;
        }
    }
}
/**************************Utility Function*******************************/
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

function arraySizeUpdate() {
    let val=numberSLider.value
    loopround = 0;
    numArr = [];
    updatenumArr(val);
    max = Math.max(...numArr);
    numArr = shuffle();
    unSorted=true;
    finishSort();
}

function sizeSliderUpdate() {
    let val=numberSLider.value
    document.getElementById('number-value').innerHTML = "Array Size: " + val;
}

function shufflenumArray() {
    finishSort();
    arraySizeUpdate(document.getElementById("number-slider").value);
    unSorted=true;
    printChartOnly(); unSorted=false;;
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

export function togglePlay() {
    play = !play;
    document.getElementById("sort-btn").innerHTML = play ? "Pause" : "Sort";
}
export function finishSort() {
    printChartOnly(); unSorted=false;;
    loopround = 0;
    enableSort();
    play = false;
}

function delayUpdate() {
    delay = document.getElementById("delay-slider").value * multiplier;
    document.getElementById('delayValue').innerHTML = "Delay: " + delay + " ms";
}

//Sleep Delay Utility
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Intial CAll Function
intial();
document.querySelector(".table").classList.toggle('tableVert');
document.querySelector(".bar").classList.toggle('barVert');
function rotateDisplayFunc(){
    document.querySelector(".table").classList.toggle('tableVert');
    document.querySelector(".bar").classList.toggle('barVert');
    horizontal=!horizontal;
    printChartOnly(); unSorted=false;
    shufflenumArray();
}
function intial(){   
    delayUpdate(document.getElementById("delay-slider").value);
    arraySizeUpdate(document.getElementById("number-slider").value);
    sizeSliderUpdate(document.getElementById("number-slider").value);
}
//EVENT Listeners
numberSLider.addEventListener('change',arraySizeUpdate);
numberSLider.addEventListener('input',sizeSliderUpdate);
rotateDisplay.addEventListener('click',rotateDisplayFunc)
btnSort.addEventListener('click',sort)
btnShuffle.addEventListener('click',shufflenumArray)
selectShuffle.addEventListener('change',shufflenumArray)
delaySlider.addEventListener('change',delayUpdate)