function pentagonalNumber(num) {
	var k = (3 * Math.pow(num, 2) - num) / 2;
	return k;
}
console.log(pentagonalNumber(1));
console.log(pentagonalNumber(2));
console.log(pentagonalNumber(5));
console.log(pentagonalNumber(9));