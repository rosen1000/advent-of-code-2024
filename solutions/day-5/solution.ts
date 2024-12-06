import { swap } from '@/lib.ts';

export default {
	part1: (input: string): number => {
		// prettier-ignore
		let [rules, updates] = input.split('\n\n').map((v, i) => i == 0 ? v.split('\n').map((v) => v.split('|').map(Number)) : v.split('\n').map((v) => v.split(',').map(Number))) as [[number, number][], number[][]];
		let sum = 0;

		loop: for (let update of updates) {
			for (let i = 0; i < update.length; i++) {
				for (let k = i - 1; k >= 0; k--) {
					if (rules.find((r) => r[0] == update[i] && r[1] == update[k])) continue loop;
				}
				for (let k = i + 1; k > update.length; k++)
					if (rules.find((r) => r[0] == update[k] && r[1] == update[i])) continue loop;
			}
			sum += update[Math.floor(update.length / 2)];
		}

		return sum; // 3608
	},
	part2: async (input: string): Promise<number> => {
		// prettier-ignore
		let [rules, updates] = input.split('\n\n').map((v, i) => i == 0 ? v.split('\n').map((v) => v.split('|').map(Number)) : v.split('\n').map((v) => v.split(',').map(Number))) as [[number, number][], number[][]];
		let wrongUpdates: typeof updates = [];
		let sum = 0;

		loop: for (let update of updates) {
			for (let i = 0; i < update.length; i++) {
				for (let k = i - 1; k >= 0; k--)
					if (rules.find((r) => r[0] == update[i] && r[1] == update[k])) {
						wrongUpdates.push(update);
						continue loop;
					}
				for (let k = i + 1; k > update.length; k++)
					if (rules.find((r) => r[0] == update[k] && r[1] == update[i])) {
						wrongUpdates.push(update);
						continue loop;
					}
			}
		}

		let promises: Promise<any>[] = [];
		for (let update of wrongUpdates) {
			promises.push(
				new Promise((res, rej) => {
					while (!check(update, rules)) shuffle(update);
					console.log(update);
					sum += update[Math.floor(update.length / 2)];
					res(sum);
				})
			);
		}
    await Promise.all(promises)

		// 8620 too high
		return sum;
	},
};

function check(update: number[], rules: [number, number][]) {
	for (let i = 0; i < update.length; i++) {
		for (let k = i - 1; k >= 0; k--)
			if (rules.find((r) => r[0] == update[i] && r[1] == update[k])) {
				return false;
			}
		for (let k = i + 1; k > update.length; k++)
			if (rules.find((r) => r[0] == update[k] && r[1] == update[i])) {
				return false;
			}
	}
	return true;
}

function shuffle(array: any[]) {
	let currentIndex = array.length;
	while (currentIndex != 0) {
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
}
