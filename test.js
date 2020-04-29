function Module(){
  let arr = [1, 2, 3];
  let task = ' go shopping';
  function todo(){
    console.log("Let's" + task);
  }
  function atos(){
    console.log(arr.join(''));
  }
  return {
    todo : todo,
    atos : atos
  }
}
let $ = Module();
$.todo();
$.atos();