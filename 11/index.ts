import * as fs from "fs";

const inputFile = "./11/input";

const lines = fs.readFileSync(inputFile, "utf8").split(/\r?\n/);

// TYPES & INTERFACES

interface Monkey {
	items: number[];
	operation: (a: number) => number;
	test: (a: number) => number;
	inspectionCount: number;
}

// PARSING

function parseMonkey(lines: string[]): Monkey {
	return {
		items: parseItems(lines[1]),
		operation: parseOperation(lines[2]),
		test: parseTest(lines.slice(3)),
		inspectionCount: 0,
	};
}

function parseItems(line: string): number[] {
	return line.match(/\d+/g)?.map((it) => Number(it)) || [];
}

function parseOperation(line: string): (a: number) => number {
	const number = line.match(/\d+/g);
	return line.includes("+")
		? (a: number) => a + Number(number)
		: number !== null
		? (a: number) => a * Number(number)
		: (a: number) => a * a;
}

function parseTest(lines: string[]): (a: number) => number {
	const divisor = Number(lines[0].match(/\d+/g));
	const trueMonkey = Number(lines[1].match(/\d+/g));
	const falseMonkey = Number(lines[2].match(/\d+/g));
	return (a: number) => {
		return a % divisor === 0 ? trueMonkey : falseMonkey;
	};
}

const monkeys: Monkey[] = [];

let filteredLines = lines.filter((line) => line !== "");
for (let i = 0; i < filteredLines.length; i += 6) {
	const chunk = filteredLines.slice(i, i + 6);
	monkeys.push(parseMonkey(chunk));
}

// TURNS AND ROUNDS

function round() {
	monkeys.forEach((monkey) => turn(monkey));
}

function turn(monkey: Monkey) {
	monkey.items.forEach((item) => {
		monkey.inspectionCount++;
		let worryLevel = monkey.operation(item);
		worryLevel = Math.floor(worryLevel / 3);
		monkeys[monkey.test(worryLevel)].items.push(worryLevel);
	});
	monkey.items = [];
}

for (let i = 0; i < 20; i++) {
	round();
}
let result1 = monkeys.map((it) => it.inspectionCount).sort((a, b) => b - a);
console.log(result1[0] * result1[1]);
