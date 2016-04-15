

var Pet = {
   words : '打个招呼：HI',
   speak : function ( say ) {
   	 console.log(say + " = " + this.words);
   }
};

Pet.speak('宠物对象Speak Speak Speak');

var dog = {
	words : '汪汪汪'
};

// call回调，Pet里面的this指dog
Pet.speak.call(dog , 'call回调 狗狗说：');


