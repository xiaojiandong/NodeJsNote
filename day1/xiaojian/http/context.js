
// this
/*
var pet = {
   words : '你说？...',
   speak : function(){
   	 console.log(this.words);
   	 console.log("this===pet ? " + (this === pet)); // true
   }
};
pet.speak();
*/

/*
function pet1 (words) {
	this.words = words;
	console.log(this.words);
	// console.log(this === pet); // false ,而是顶层的global
	console.log(this === global); // true
}
pet1('hello');
*/


function Pet2 ( words ){
  this.words = words;
  this.speak = function(){
  	console.log( this.words );
  	// this -> 函数拥有者
  	console.log(this); // 返回一个对象 : {words:'Miao' , speak : [Function]} 
  }
};

var cat = new Pet2('Miao');
cat.speak();