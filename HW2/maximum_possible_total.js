function minMax(arr) {
	var min = 9007199254740992;
	var max = -2147483648;

	var i;
	for (i = 0; i < arr.length; i++) {
	 	if (arr[i] > max) {
	 		max = arr[i];
	 	}
	 	if (arr[i] < min) {
	 		min = arr[i];
	 	}
	}
	return [min, max];
}

function maxTotal(arr) {
  	var sum = 0;
	for (var i = 0; i < 5; i++) {
		var max = minMax(arr)[1];
		arr.splice(arr.indexOf(max), 1);
    sum = sum + max;
	}
	return sum
}
console.log(maxTotal([1, 1, 0, 1, 3, 10, 10, 10, 10, 1]));
console.log(maxTotal([0, 0, 0, 0, 0, 0, 0, 0, 0, 100]));
console.log(maxTotal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));  