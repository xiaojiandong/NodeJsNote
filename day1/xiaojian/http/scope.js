
var globalValiable = 'this is global variable 全局变量';

function globalFn () {
  var localVariable = 'this is local variable 局部变量';
  console.log('visit global/local variable:');
  console.log( globalValiable );
  console.log( localVariable );

  globalValiable = '改变了全局变量！';
  console.log( globalValiable );

  function localFn (){
    var innerLocalVariable = '内部局部变量';
    console.log('-----------------');
    console.log('visit global/local/innerLocal variable');
    console.log( globalValiable );
    console.log( localVariable );
    console.log( innerLocalVariable );
  };
  localFn();

};

globalFn();