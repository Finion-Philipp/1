import * as fs from "fs";

const inputFile = "./2/input";

const lines = fs.readFileSync(inputFile, "utf8").split(/\r?\n/);

type ElfResult = "A" | "B" | "C";
type MeResult = "X" | "Y" | "Z";
interface Match {
	elf: ElfResult;
	me: MeResult;
}

const WIN = {
	A: "Y",
	B: "Z",
	C: "X",
};
const DRAW = {
	A: "X",
	B: "Y",
	C: "Z",
};
const LOSE = {
	A: "Z",
	B: "X",
	C: "Y",
};

function calculateTotalMatchScore(line: string): number {
	const splitLine = line.split(" ");
	const match = {
		elf: splitLine[0] as ElfResult,
		me: splitLine[1] as MeResult,
	};
	return calculateFigureScore(match) + calculateWinningScore(match);
}

function calculateFigureScore(match: Match): number {
	switch (match.me) {
		case "X":
			return 1;
		case "Y":
			return 2;
		case "Z":
			return 3;
	}
}

function calculateWinningScore(match: Match): number {
	if (WIN[match.elf] === match.me) return 6;
	if (DRAW[match.elf] === match.me) return 3;
	if (LOSE[match.elf] === match.me) return 0;
	return 0;
}

let totalScore1 = 0;

lines.forEach((line) => {
	totalScore1 += calculateTotalMatchScore(line);
});

console.log(`total score part 1: ${totalScore1}`);
