
// <script src='a.js'></script>
// <script src='b.js'></script>
// <script src='c.js'></script>

// 阻塞
/*
var i = 0;
while(true){
	i++;
}
*/

var c = 1;
function printIt (){
   console.log( c );
};

function plus ( callback ){
  setTimeout(function(){
    c += 1;
    callback();
  } , 1000);	
};

plus( printIt );
// printIt();
