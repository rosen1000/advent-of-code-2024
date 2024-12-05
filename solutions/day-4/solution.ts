export default {
	part1: (input: string): number => {
		let map = input.split('\n').map((line) => line.split(''));
		let w = map.length;
		let l = map[0].length;
		let sum = 0;
		for (let i = 0; i < w; i++) {
			for (let j = 0; j < l; j++) {
				if (map[i][j] == 'X') {
					if (i >= 3) {
						console.log(map[i - 1][j], map[i - 2][j], map[i - 3][j]);
						if (mas(map[i - 1][j], map[i - 2][j], map[i - 3][j])) {
							sum++;
						}
					}
					if (i < w - 3) {
						console.log(map[i + 1][j], map[i + 2][j], map[i + 3][j]);
						if (mas(map[i + 1][j], map[i + 2][j], map[i + 3][j])) {
							sum++;
						}
					}
					if (j >= 3) {
						console.log(map[i][j - 1], map[i][j - 2], map[i][j - 3]);
						if (mas(map[i][j - 1], map[i][j - 2], map[i][j - 3])) sum++;
					}
					if (j < l - 3) {
						console.log(map[i][j + 1], map[i][j + 2], map[i][j + 3]);
						if (mas(map[i][j + 1], map[i][j + 2], map[i][j + 3])) sum++;
					}
					if (i >= 3 && j >= 3) {
						console.log(map[i - 1][j - 1], map[i - 2][j - 2], map[i - 3][j - 3]);
						if (mas(map[i - 1][j - 1], map[i - 2][j - 2], map[i - 3][j - 3])) sum++;
					}
					if (i < w - 3 && j < l - 3) {
						console.log(map[i + 1][j + 1], map[i + 2][j + 2], map[i + 3][j + 3]);
						if (mas(map[i + 1][j + 1], map[i + 2][j + 2], map[i + 3][j + 3])) sum++;
					}
					if (i >= 3 && j < l - 3) {
						console.log(map[i - 1][j + 1], map[i - 2][j + 2], map[i - 3][j + 3]);
						if (mas(map[i - 1][j + 1], map[i - 2][j + 2], map[i - 3][j + 3])) sum++;
					}
					if (i < l - 3 && j >= 3) {
						console.log(map[i + 1][j - 1], map[i + 2][j - 2], map[i + 3][j - 3]);
						if (mas(map[i + 1][j - 1], map[i + 2][j - 2], map[i + 3][j - 3])) sum++;
					}
				}
			}
		}
		return sum; // 2493
	},
	part2: (input: string): number => {
		let map = input.split('\n').map((line) => line.split(''));
		let w = map.length;
		let l = map[0].length;
		let sum = 0;
		for (let i = 1; i < w - 1; i++) {
			for (let j = 1; j < l - 1; j++) {
				if (map[i][j] == 'A') {
					if (
						map[i - 1][j - 1] == map[i - 1][j + 1] &&
						map[i + 1][j - 1] == map[i + 1][j + 1] &&
						map[i - 1][j - 1] != map[i + 1][j + 1] &&
						!'XA'.includes(map[i - 1][j - 1]) &&
						!'XA'.includes(map[i + 1][j + 1])
					)
						sum++;

					if (
						map[i - 1][j - 1] == map[i + 1][j - 1] &&
						map[i - 1][j + 1] == map[i + 1][j + 1] &&
						map[i - 1][j - 1] != map[i + 1][j + 1] &&
						!'XA'.includes(map[i - 1][j - 1]) &&
						!'XA'.includes(map[i + 1][j + 1])
					)
						sum++;
				}
			}
		}
		return sum; // 1890
	},
};

function mas(m: string, a: string, s: string) {
	return m == 'M' && a == 'A' && s == 'S';
}
