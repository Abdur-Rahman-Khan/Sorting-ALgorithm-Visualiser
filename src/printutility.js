import {numArr,horizontal,delay,loopround,multiplier,max,unSorted,play,l,r
} from './index.js'

export
function printChartOnly() {
    document.getElementsByClassName("table")[0].innerHTML = "";
    var i;
    for (i = 0; i < numArr.length; i++) {
        print(numArr[i], max);
        if(unSorted)
         document.getElementsByClassName("bar")[i].classList.add("unsorted");
    }
    // unSorted=false
}
export
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

export
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

export
function printRangeCurrMerge(l, r, curr=(l+r)/2) {
    // console.log(curr);

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
            // document.getElementsByClassName("bar")[i].classList.remove("unsorted");
        }
        if (i == curr) {
            document.getElementsByClassName("bar")[i].classList.remove("unsorted");
            document.getElementsByClassName("bar")[i].classList.add("curr");
        }

    }
}
export
function print(num, max) {
    if(horizontal){
        document.body.getElementsByClassName("table")[0].innerHTML += ("<div class='chart'><div class='bar' style='width: " + num / max * 100 + "%;'></div></div>");
    }
    else{
        document.body.getElementsByClassName("table")[0].innerHTML += ("<div class='chart'><div class='bar' style='height: " + num / max * 100 + "%;'></div></div>");
    }
    // unsorted=false
}