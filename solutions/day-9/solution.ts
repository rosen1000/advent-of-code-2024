export default {
	part1: (input: string): number => {
		let id = 0;
		let disk = input
			.split('')
			.map((v, i) => (i % 2 == 0 ? Array<number>(+v).fill(id++) : '.'.repeat(+v).split('')))
			.flat();

		let i = 0;
		let j = disk.length - 1;
		// FIXME: this is dirty hack
		// because at the end there is an empty space before the very last id
		while (i < j - 4) {
			while (disk[i] != '.') i++;
			while (isNaN(+disk[j])) j--;
			disk[i++] = disk[j];
			disk[j--] = '.';
		}

		let checksum = 0;
		for (let i in disk) {
			let num = +disk[i];
			if (isNaN(num)) break;
			checksum += num * +i;
		}

		return checksum; // 6288599492129
	},
	part2: (input: string): number => {
		let id = 0;
		let disk = input
			.split('')
			.map((v, i) => (i % 2 == 0 ? Array<number>(+v).fill(id++) : '.'.repeat(+v).split('')))
			.flat();

		let i = 0;
		let j = disk.length - 1;
		while (j > 0) {
			i = 0;
			while (disk[j] == '.') j--;
			let count = 0;
			let currId = disk[j];
			while (disk[j] == currId) {
				j--;
				count++;
			}

			while (i < j && (disk[i] != '.' || !disk.slice(i, i + count).every((v) => v == '.'))) i++;
			if (i >= j) continue;
			disk.splice(i, count, ...disk.slice(j + 1, j + 1 + count));
			disk.splice(j + 1, count, ...Array(count).fill('.'));
		}

		let checksum = 0;
		for (let i in disk) {
			let num = +disk[i];
			if (!isNaN(num)) checksum += num * +i;
		}

		return checksum;
	},
};
