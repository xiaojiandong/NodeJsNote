
function learn (something) {
	console.log( something );
}

function we ( callback , something ) {
   something += ' is coll haha';
   callback( something );
}

we(learn , 'Node.js'); // 有名字的函数 learn

we(function( yimingFn ){
  console.log( yimingFn + ' 匿名函数：' )
} , '小剑');
