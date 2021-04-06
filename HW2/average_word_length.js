function avgWordLengthCalc(text) {
  var punctuationless = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  var finalString = punctuationless.replace(/\s{2,}/g,"");
	var res = finalString.split(" ");

  var sum = 0;
	for (var i = res.length - 1; i >= 0; i--) {
		sum = sum + res[i].length;
	}
  var x = sum/res.length;
  return x.toFixed(2);
}
console.log(avgWordLengthCalc("q w e r t y"));
console.log(avgWordLengthCalc("The reduce method executes a reducer function."));
console.log(avgWordLengthCalc("callback is called, accumulator!"));
console.log(avgWordLengthCalc(""));