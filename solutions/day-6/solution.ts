import { sleepSync } from 'bun';

export default {
	part1: (input: string): number => {
		let map = input.split('\n').map((v) => v.split(''));
		let pos: Vec2 = [map.findIndex((l) => l.findIndex((v) => v == '^') > 0), -1];
		pos[1] = map[pos[0]].findIndex((v) => v == '^');
		let dir = up;

		while (true) {
			set(map, pos, 'X');
			let npos = move(pos, dir);
			if (npos[0] < 0 || npos[0] >= map.length || npos[1] < 0 || npos[1] >= map[0].length) break;
			if (get(map, npos) == '#') {
				dir = rotate(dir);
				npos = move(pos, dir);
			}
			pos = npos;
		}

		let sum = 0;
		map.flat().forEach((v) => (v == 'X' ? sum++ : ''));
		return sum; // 4982
	},
	part2: (input: string): number => {
		let map = input.split('\n').map((v) => v.split(''));
		let pos: Vec2 = [map.findIndex((l) => l.findIndex((v) => v == '^') > 0), -1];
		pos[1] = map[pos[0]].findIndex((v) => v == '^');
		let startPos = structuredClone(pos); // caching strating pos for future maps
		let dir = up;

		while (true) {
			set(map, pos, 'X');
			let npos = move(pos, dir);
			if (npos[0] < 0 || npos[0] >= map.length || npos[1] < 0 || npos[1] >= map[0].length) break;
			if (get(map, npos) == '#') {
				dir = rotate(dir);
				npos = move(pos, dir);
			}
			pos = npos;
		}

		let maps: (typeof map)[] = [];
		for (let i in map) {
			for (let j in map[i]) {
				if (+i == startPos[0] && +j == startPos[1]) continue;
				if (map[i][j] == 'X') {
					let nmap = structuredClone(map);
					nmap[i][j] = '#';
					maps.push(nmap);
				}
			}
		}

		let sum = 0;
		for (let map of maps) {
			let steps = map.length * map[0].length;
			let result = false;
			pos = structuredClone(startPos);

			dir = up;
			while (--steps > 0 && (result = true)) {
				// if (--steps == 0) {
				//   result = true;
				// 	break;
				// }
				let npos = move(pos, dir);
				if (npos[0] < 0 || npos[0] >= map.length || npos[1] < 0 || npos[1] >= map[0].length) break;
				if (get(map, npos) == '#') {
					dir = rotate(dir);
					npos = move(pos, dir);
				}
				pos = npos;
			}

			if (result) sum++;
		}

		// 1601 too low
		return sum;
	},
};

type Vec2 = [number, number];
const up = [-1, 0] as Vec2;
const down = [1, 0] as Vec2;
const left = [0, -1] as Vec2;
const right = [0, 1] as Vec2;
const move = (pos: Vec2, dir: Vec2): Vec2 => [pos[0] + dir[0], pos[1] + dir[1]];
const rotate = (dir: Vec2) => {
	switch (dir) {
		case up:
			return right;
		case right:
			return down;
		case down:
			return left;
		case left:
			return up;
	}
	return up;
};
const get = (map: string[][], pos: Vec2) => map[pos[0]][pos[1]];
const set = (map: string[][], pos: Vec2, value: string) => (map[pos[0]][pos[1]] = value);
