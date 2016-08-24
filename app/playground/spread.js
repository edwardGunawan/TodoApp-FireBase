// function add(a,b){
//   return a+b;
// }
//
// console.log(add(3,1));
//
// // spread operator are useful when you want ot call a function with a set of argument, but
// // those argument are in an array.
// var toAdd=[9, 5];
// // add(toAdd[0],toAdd[1]); // to add 9+5, gets hard and confusing
// console.log(add(... toAdd)); // spread opearator, means it spread the array elements into an individual value

// var groupA =['Jen', 'Cory'];
// var groupB = ['Vikram'];
// var final = [...groupB, 3, ...groupA]; // combine the array into final array, if you just put groupA, it will be array nested inside an array
//
// console.log(final);

var person = ['Andrew', 25];
var person2 = ['Jen', 29];

// hi Andrew, you are 25
function challenge(name, age){
  console.log('hi '+ name + " you are "+ age +'!');
}

challenge(...person);
challenge(...person2);

var names=['Mike', 'Ben'];
var final = ['Andrew', ...names];

final.forEach(function(name){
  console.log('Hi', name);
});
