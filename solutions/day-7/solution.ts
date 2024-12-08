export default {
	part1: (input: string): number => {
		let lines = input.split('\n');
		let sum = 0;
		for (let line of lines) {
			let [_result, _numbers] = line.split(': ');
			let result = +_result;
			let numbers = _numbers.split(' ').map(Number);

			for (let i = 0; i < numbers.length ** 2 - 1; i++) {
        for (let j = 0; j < numbers.length - 1; j++) {
					let symbols = i
						.toString(2)
						.padStart(numbers.length - 1, '0')
						.replaceAll('0', '+')
						.replace('1', '*');
					for (let sym of symbols) {
						switch (sym) {
						}
					}
				}
			}
		}
		return sum;
	},
	part2: (input: string): number => {
		return 0;
	},
};
