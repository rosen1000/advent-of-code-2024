export default {
	part1: (input: string): number => {
		let map = input.split('\n').map((l) => l.split(''));

		// Build list of different antennas
		let alphabet: Set<string> = new Set();
		for (let char of map.flat()) {
			if (char != '.') alphabet.add(char);
		}

		let antinodes: Set<string> = new Set();
		for (let char of alphabet) {
			let coords: Vec2[] = [];

			for (let i = 0; i < map.length; i++) {
				for (let j = 0; j < map[i].length; j++) {
					if (map[i][j] == char) coords.push([i, j]);
				}
			}

			for (let i = 0; i < coords.length - 1; i++) {
				for (let j = i + 1; j < coords.length; j++) {
					let a = coords[i];
					let b = coords[j];
					let diff: Vec2 = [a[0] - b[0], a[1] - b[1]];
					let pos1: Vec2 = [a[0] + diff[0], a[1] + diff[1]];
					let pos2: Vec2 = [b[0] - diff[0], b[1] - diff[1]];

					if (!oob(map, pos1)) antinodes.add(pos1.toString());
					if (!oob(map, pos2)) antinodes.add(pos2.toString());
				}
			}
		}

		return antinodes.size; // 289
	},
	part2: (input: string): number => {
		let map = input.split('\n').map((l) => l.split(''));

		// Build list of different antennas
		let alphabet: Set<string> = new Set();
		for (let char of map.flat()) {
			if (char != '.') alphabet.add(char);
		}

		let antinodes: Set<string> = new Set();
		for (let char of alphabet) {
			let coords: Vec2[] = [];

			for (let i = 0; i < map.length; i++) {
				for (let j = 0; j < map[i].length; j++) {
					if (map[i][j] == char) coords.push([i, j]);
				}
			}

			for (let i = 0; i < coords.length - 1; i++) {
				for (let j = i + 1; j < coords.length; j++) {
					let a = coords[i];
					let b = coords[j];
					let diff: Vec2 = [a[0] - b[0], a[1] - b[1]];
					let pos1: Vec2 = add(a, diff);
					while (!oob(map, pos1)) {
						antinodes.add(pos1.toString());
						pos1 = add(pos1, diff);
					}
					let pos2: Vec2 = add(b, diff);
					while (!oob(map, pos2)) {
						antinodes.add(pos2.toString());
						pos2 = sub(pos2, diff);
					}
				}
			}
		}

		return antinodes.size; // 1030
	},
};

type Vec2 = [number, number];
const oob = (map: string[][], pos: Vec2) => pos[0] < 0 || pos[1] < 0 || pos[0] >= map.length || pos[1] >= map[0].length;
const add = (v1: Vec2, v2: Vec2): Vec2 => [v1[0] + v2[0], v1[1] + v2[1]];
const sub = (v1: Vec2, v2: Vec2): Vec2 => [v1[0] - v2[0], v1[1] - v2[1]];
