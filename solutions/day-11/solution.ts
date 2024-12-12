import * as _ from 'lodash';

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

		let cache = _.countBy(stones);
		stones = _.keys(cache).map(Number);
		let sum = _.sumBy(_.values(cache))

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

		let cache2 = _.countBy(stones)
		console.log(cache2);

		return stones.length;
	},
};
