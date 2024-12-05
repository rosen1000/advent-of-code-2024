export default {
	part1: (input: string): number => {
		let lines = input
			.trim()
			.split('\n')
			.map((v) => v.split(' ').map((v) => +v));

		let safe = 0;
		loop: for (let line of lines) {
			let direction = Math.sign(line[0] - line[1]);

			for (let i = 0; i < line.length - 1; i++) {
				let step = line[i] - line[i + 1];
				if (Math.sign(step) != direction) continue loop;
				if (step == 0 || Math.abs(step) > 3) continue loop;
			}

			safe++;
		}

		return safe; // 624
	},
	part2: (input: string): number => {
		let lines = input
			.trim()
			.split('\n')
			.map((v) => v.split(' ').map((v) => +v));

		let safe = 0;
		loop: for (let line of lines) {
			let direction = Math.sign(line[0] - line[1]);
			let dampenerUsed = false;

			for (let i = 0; i < line.length - 1; i++) {
				let step = line[i] - line[i + 1];

				// if (Math.sign(step) != direction) console.log(`Failing case 1 at ${step}`)
				// if (step == 0) console.log(`Failing case 2 at ${step}`)
				// if (Math.abs(step) > 3) console.log(`Failing case 3 at ${step}`)

				if (Math.sign(step) != direction || step == 0 || Math.abs(step) > 3) {
					if (!dampenerUsed) {
						dampenerUsed = true;
						// if (i == 0) direction = Math.sign(line[1] - line[2]);
						line[i + 1] = line[i];
						i = 0;
					} else continue loop;
				}
			}

			console.log(line);

			safe++;
		}

		return safe;
	},
};
