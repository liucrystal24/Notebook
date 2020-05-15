function showBiBao() {
  for (var i = 0; i < 5; i++) {
    setTimeout(function timer() {
      console.log(i);
    }, 1000);
  }
  console.log(i);
}
// 会输出什么
showBiBao();
