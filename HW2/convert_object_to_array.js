function toArr(object) {
	return Object.entries(object);
}

console.log(toArr({ key1: 'value1', key2: 'value2' }));
console.log(toArr([]));