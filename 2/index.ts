import * as fs from "fs";

const inputFile = "./2/input";

const lines = fs.readFileSync(inputFile, "utf8").split(/\r?\n/);

let totalScore1 = 0;

lines.forEach((line) => {
	totalScore1 += calculateTotalMatchScore(line);
});

console.log(`total score part 1: ${totalScore1}`);

function calculateTotalMatchScore(match: string): number {
	return calculateFigureScore(match) + calculateWinningScore(match);
}

function calculateFigureScore(match: string): number {
	if (match.includes("X")) return 1;
	if (match.includes("Y")) return 2;
	if (match.includes("Z")) return 3;
	return 0;
}

function calculateWinningScore(match: string): number {
	switch (match) {
		case "A X":
			return 3;
		case "A Y":
			return 6;
		case "A Z":
			return 0;
		case "B X":
			return 0;
		case "B Y":
			return 3;
		case "B Z":
			return 6;
		case "C X":
			return 6;
		case "C Y":
			return 0;
		case "C Z":
			return 3;
		default:
			break;
	}
	return 0;
}
