export default {
	part1: (input: string): number => {
		let stones: (number | number[])[] = input.split(' ').map(Number);
		const steps = 25;
		for (let i = 0; i < steps; i++) {
			for (let si = 0; si < stones.length; si++) {
				let stone = stones[si];
				if (stone == 0) stones[si] = 1;
				else if (stone.toString().length % 2 == 0) {
					let str = stone.toString();
					stones[si] = [+str.slice(0, str.length / 2), +str.slice(str.length / 2, str.length)];
				} else if (typeof stone == 'number') stones[si] = stone * 2024;
			}
			stones = stones.flat();
		}
		return stones.length; // 198075
	},
	part2: (input: string): number => {
		let stones: (number | number[])[] = input.split(' ').map(Number);

		function deepdive(stone: number, step: number = 0): number {
			// console.log(step);
			if (step == 75) return 1;

			if (stone == 0) stone = 1;
			else if (stone.toString().length % 2 == 0) {
				let str = stone.toString();
				// stone = [+str.slice(0, str.length / 2), +str.slice(str.length / 2, str.length)];
				let a = deepdive(+str.slice(0, str.length / 2), step + 1);
				let b = deepdive(+str.slice(str.length / 2, str.length), step + 1);
				return a + b;
			} else if (typeof stone == 'number') stone = stone * 2024;
			// console.log(stone);
			return deepdive(stone, step + 1);
		}

		console.log(deepdive(2701));

		// for (let i = 0; i < 75; i++) {
		// 	for (let si = 0; si < stones.length; si++) {
		// 		let stone = stones[si];
		// 		if (stone == 0) stones[si] = 1;
		// 		else if (stone.toString().length % 2 == 0) {
		// 			let str = stone.toString();
		// 			stones[si] = [+str.slice(0, str.length / 2), +str.slice(str.length / 2, str.length)];
		// 		} else if (typeof stone == 'number') stones[si] = stone * 2024;
		// 	}
		// 	stones = stones.flat();
		// }
		return stones.length;
	},
};
