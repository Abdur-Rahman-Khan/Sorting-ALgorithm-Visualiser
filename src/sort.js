import {numArr,play,sleep,togglePlay,delay,finishSort} from './index.js'
import {printChartOnly,printRange,printRangeCurr,print,printRangeCurrMerge} from './printutility.js'

//Quicksort
export
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

function swap(i1, i2) {
    let temp = numArr[i1];
    numArr[i1] = numArr[i2];
    numArr[i2] = temp;
}



//Bubble Sort
export
function BubbleSort(loopround) {
    if (loopround >= numArr.length - 1) {
        finishSort();
        return;
    }
    var pos = 0;
    for (let j = 0; j < numArr.length; j++) {
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
export
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
    var L = [],R = [],i, j, k;
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

export
async function mergeSort(l, r) {
    if (l < r) {
        var m = parseInt((l + r) / 2);
        printRangeCurrMerge(l, r);
        await sleep(delay / 3);
        await mergeSort(l, m); // merge sort
        printRangeCurrMerge(l, m);
        await sleep(delay / 3);
        await mergeSort(m + 1, r);  // merge sOrt
        printRangeCurrMerge(m + 1, r);
        await sleep(delay / 3);
        await merge(l, m, r);   // finally merge them
    }
}

//Selection Sort
export
 function selectionSort(loopround) {
    var j, pos;
    // console.log("B",loopround);
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
        // console.log("A",loopround,pos);
        if (play) {
            loopround += 1;
            setTimeout(() => selectionSort(loopround), delay);
        }
    }
}


// //HeapSort
// async function heapify(n, i) {
//     var largest = i; // Initialize largest as root 
//     var l = 2 * i + 1; // left = 2*i + 1 
//     var r = 2 * i + 2; // right = 2*i + 2 
//     if (l < n && numArr[l] > numArr[largest])
//         largest = l;
//     if (r < n && numArr[r] > numArr[largest])
//         largest = r;
//     if (largest != i) {
//         swap(i, largest);
//         await heapify(n, largest);
//     }
// }

// export
// async function heapSort(n) {
//     var i;
//     for (i = n / 2 - 1; i >= 0; i--)
//         await heapify(n, i);
//     printRangeCurr(0, i, n);
//     await sleep(delay / 2);
//     for (i = n - 1; i >= 0; i--) {
//         swap(0, i);
//         await heapify(i, 0, i);
//         printRangeCurr(0, i, i);
//         await sleep(delay / 2);
//     }
//     printChartOnly(); unSorted=false;;
//     finishSort();
// }