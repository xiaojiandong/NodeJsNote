
// 用call(或apply)实现继承
function Pet(words) {
  this.words = words;
  this.speak = function( ){
    console.log( this.words );
  };
};


function Dog (words) {
	Pet.call(this , words);
    //Pet.apply(this , arguments); // 等同call
}

var dog = new Dog('狗狗叫：');
dog.speak();


