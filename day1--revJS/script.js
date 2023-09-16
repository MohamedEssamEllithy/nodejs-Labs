//                               Task 1

function ageInDays(years){
return years*365 ;
}
console.log(" your age in Days",ageInDays(26))



//                               Task 2
function smallestNum(arr){
   if (arr.length == 0){
    console.log("Error is Found")
   }
    let smllNum =arr[0]
    for (let i=0 ; i<arr.length ;i++) {
        if(smllNum >= arr[i]){
            smllNum =arr[i]
        }
        
    }
    return smllNum;
}
console.log(smallestNum([10,5,2,15]))



//   Task 3    Create a function that takes any non-negative number as an array and 
//             return it with its digits in descending order. 
//             Descending order is when you sort from highest to lowest.                             

function descending(arr){
     if (arr.length == 0) {
       console.log("Error is Found");
     }
     let largNum =0;
     for (let i=0 ; i<arr.length-1 ;i++) {
        if(arr[i]>0){
        for (let j=0;j<arr.length-1;j++){
            if(arr[j] < arr[j+1]){
            largNum =arr[j+1];
            arr[j+1]=arr[j];
            arr[j]=largNum;
            
        }
    }}}
    return arr;
}
console.log(descending([2,12,19,9,40,5,30]));


// task 4  ** Create a function that takes an array of numbers and 
// returns the average of this numbers.        

function avgOfnums(arr){
    let sum = 0;
    
    for (let i=0 ;i<=arr.length-1 ;i++) {
        sum+=arr[i];
        
        console.log(sum)
    }
    return avg =sum/arr.length;
}
console.log("avgOfnums", avgOfnums([12, 3, 5, 4, 6]));

// task 5      ** what is the output of

console.log( [] == [] )
console.log({}=={})

//  the output of these is false becouse the comparison is based on reference "location in memory" equality 
// not the equality of contents


// task 6    ** what is the output of this code with explaination
function main() {
console.log("A");
setTimeout(function print() {
console.log("B");
}, 0);
console.log("C");
}
main();

//  the output is A
//                c
//                B

//  first the main() fn is called ,then the " console.log("A") " is excuted and logs A to console.
// The setTimeout function is called with a callback and a delay of 0 milliseconds.The callback function 
// is not immediately executed but scheduled to be executed after the specified delay
//  so the " console.log("C");" will excuted before setTimeout function.
// As there is no other synchronous code to execute, the JavaScript runtime moves on to process any pending tasks in the event queue.
//  well,"B" is logged to the console,finally.



// task 7    ** what is the output of this code with explaination
var num = 8;
var num = 10;
console.log(num);
// the output is 10 ,  var  allows for re-declaration, re-initialization and re-assignment 



// task 8  ** what is the output of this code with explaination
function sayHi() {
console.log(name);
console.log(age);
var name = 'Ayush';
let age = 21;
}
console.log (sayHi());

//  the output of "console.log(name);" is undefined => Since var variables are hoisted  ..
// the name variable is declared but its value is undefined .

//the output of "console.log(age)" ReferenceError: age is not defined =>let variables aren't hoisted  
