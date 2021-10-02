// export default x=1;
import {numArr} from './index.js'
export 
function Prime(val){
    var j=2;
    for (var i = 0; i < val; i++) {
        for(;j<2000;j++){
            var flag=1;
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
export
 function Random(val){  
     for (var i = 0; i < val; i++) {
    numArr.push(Math.random()*val);
    }

}
export
 function Linear(val){
    for (var i = 0; i < val; i++) {
        numArr.push(i+1);
    }
}
export 
function Square(val){
    for (var i = 0; i < val; i++) {
        numArr.push((i+1)*(i+1));
    }
}
export 
function Cube(val){
    for (var i = 0; i < val; i++) {
        numArr.push(Math.pow((i+1),3));
    }
}
