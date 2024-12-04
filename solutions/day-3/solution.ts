export default {
	part1: (input: string): number => {
		let regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
		let found = input.matchAll(regex);
		let sum = 0;
		found.forEach((v) => (sum += +v[1] * +v[2]));
		return sum; // 155955228
	},
	part2: (input: string): number => {
		let regex = /(mul\((\d{1,3}),(\d{1,3})\))|(do(n't)?)/g;
		let found = input.matchAll(regex);
		let sum = 0;
		let mode = true;
		found.forEach((v) => {
			if (v[0] == 'do') mode = true;
			else if (v[0] == "don't") mode = false;
			else if (mode) sum += +v[2] * +v[3];
		});
		return sum; // 100189366
	},
};
