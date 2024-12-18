import { Vec2 } from './utils';

export default {
	part1: (input: string): number => {
		console.time('Parsing input');
		let slots = input.split('\n\n').map((b) => new Slots(b));
		console.timeEnd('Parsing input');

		let tokens = 0;
		console.time('Pressing buttons');
		for (let slot of slots) {
			let res = searchIterate(slot);
			if (res) {
				tokens += res.x * 3 + res.y;
			}
		}
		console.timeEnd('Pressing buttons');

		return tokens; // 25629
	},
	part2: (input: string): number => {
		console.time('Parsing input');
		let adder = new Vec2(10000000000000);
		let slots = input.split('\n\n').map((b) => new Slots(b));
		slots.forEach((s) => s.p.addP(adder));
		console.timeEnd('Parsing input');

		let tokens = 0;
		console.time('Pressing buttons');
		for (let slot of slots) {
			let res = searchIterate(slot); // DNF
			if (res) {
				tokens += res.x * 3 + res.y;
			}
			console.timeLog('Pressing buttons');
		}
		console.timeEnd('Pressing buttons');

		return tokens;
	},
};

function searchIterate(slot: Slots) {
	for (let b = slot.p.x / slot.b.x; b > 0; b--) {
		let a = 0;
		let coords = slot.b.mul(b);
		while (coords.x < slot.p.x || coords.y < slot.p.y) {
			coords.addP(slot.a);
			a++;
		}
		if (coords.eq(slot.p)) return new Vec2(a, b);
	}
	return null;
}

class Slots {
	a: Vec2;
	b: Vec2;
	p: Vec2;
	constructor(block: string) {
		let regex = /(\d+).*[\+=](\d+)/g;
		let [butA, butB, prize] = block.split('\n');
		let ba = butA.matchAll(regex)!.next().value!;
		this.a = new Vec2(+ba[1], +ba[2]);
		let bb = butB.matchAll(regex)!.next().value!;
		this.b = new Vec2(+bb[1], +bb[2]);
		let pr = prize.matchAll(regex)!.next().value!;
		this.p = new Vec2(+pr[1], +pr[2]);
	}
}
