import { Dir, Grid, Vec2 } from '@/utils.ts';

export default {
	part1: (input: string): number => {
		let grid = new Grid(input);
		let starts: Vec2[] = [];
		let sum = 0;
		grid.forEach((v, p) => v == 0 && starts.push(p));

		for (let start of starts) {
			let score = { value: 0 };
			let explored: Vec2[] = [];
			traverse(grid, start, explored, score);
			sum += score.value;
		}

		return sum; // 535
	},
	part2: (input: string): number => {
		let grid = new Grid(input);
		let starts: Vec2[] = [];
		let sum = 0;
		grid.forEach((v, p) => v == 0 && starts.push(p));

		for (let start of starts) {
			let score = { value: 0 };
			traverseAll(grid, start, score);
			sum += score.value;
		}

		return sum; // 1186
	},
};

function traverse(grid: Grid, pos: Vec2, explored: Vec2[], scorePtr: { value: number }) {
	if (explored.findIndex((v) => v.eq(pos)) >= 0) return;
	explored.push(pos);
	let value = grid.get(pos);

	if (value == null) return;
	if (value == 9) return scorePtr.value++;
	Object.entries(Dir).forEach(([_, dir]) => {
		if (grid.getAdj(pos, dir) == value + 1) traverse(grid, pos.add(dir), explored, scorePtr);
	});
}

function traverseAll(grid: Grid, pos: Vec2, scorePtr: { value: number }) {
	let value = grid.get(pos);
	if (value == null) return;
	if (value == 9) return scorePtr.value++;
	Object.entries(Dir).forEach(([_, dir]) => {
		if (grid.getAdj(pos, dir) == value + 1) traverseAll(grid, pos.add(dir), scorePtr);
	});
}
