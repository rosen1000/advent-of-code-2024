export default {
	part1: (input: string): number => {
		let arr1: number[] = [];
		let arr2: number[] = [];

		input.split('\n').forEach((line) => {
			let p = line.split('   ');
			arr1.push(+p[0]);
			arr2.push(+p[1]);
		});
		if (arr1.length != arr2.length) throw new Error('Something horrible happened');

		arr1.sort();
		arr2.sort();

		let sum = 0;
		for (let i = 0; i < arr1.length; i++) {
			sum += Math.abs(arr1[i] - arr2[i]);
		}

		return sum; // 936063
	},
	part2: (input: string): number => {
		let arr1: number[] = [];
		let arr2: number[] = [];

		input
			.trim()
			.split('\n')
			.forEach((line) => {
				let p = line.split('   ');
				arr1.push(+p[0]);
				arr2.push(+p[1]);
			});
		if (arr1.length != arr2.length) throw new Error('Something horrible happened');

		let sum = arr1.map((x) => x * arr2.filter((y) => x == y).length).reduce((sum, v) => sum + v);

		return sum; // 23150395
	},
};
