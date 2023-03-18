console.log("School Sports Day Function:")
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function OpeningCeremony(score, callbackFnc) {
  console.log("Let's start the games:");
  await delay(1000);
  console.log("Opening Ceremony Completed..!!");
  Race100M(score, callbackFnc);
}

async function Race100M(score, callbackFnc) {
  console.log("Starting Race 100M...");
  await delay(3000);
  const times = { red: getRandomTime(), blue: getRandomTime(), green: getRandomTime(), yellow: getRandomTime() };
  console.log(`Race 100M Completed..!! Times:`, times);
  const sortedTimes = Object.entries(times).sort(([, a], [, b]) => a - b);
  score[sortedTimes[0][0]] += 50;
  score[sortedTimes[1][0]] += 25;
  console.log(`Updated Score:`, score);
  callbackFnc(score, LongJump);
}

async function LongJump(score, callbackFnc) {
  console.log("Starting Long Jump...");
  await delay(2000);
  const color = Object.keys(score)[Math.floor(Math.random() * 4)];
  console.log(`${color} won the Long Jump!`);
  score[color] += 150;
  console.log(`Updated Score:`, score);
  callbackFnc(score, HighJump);
}

async function HighJump(score, callbackFnc) {
  console.log("Starting High Jump...");
  const input = prompt("Choose the color for highest jump?");
  if (input === null || input.trim() === "") {
    console.log("Event was cancelled");
  } else {
    const color = input.toLowerCase();
    if (score[color] !== undefined) {
      score[color] += 100;
      console.log(`${color} won the High Jump!`);
    } else {
      console.log("Event was cancelled");
    }
  }
  console.log(`Updated Score:`, score);
  callbackFnc(score, AwardCeremony);
}

function AwardCeremony(score) {
  console.log("Starting Award Ceremony...");
  const sortedScores = Object.entries(score).sort(([, a], [, b]) => b - a);
  console.log(`${sortedScores[0][0]} came first with ${sortedScores[0][1]} points.`);
  console.log(`${sortedScores[1][0]} came second with ${sortedScores[1][1]} points.`);
  console.log(`${sortedScores[2][0]} came third with ${sortedScores[2][1]} points.`);
}

function getRandomTime() {   
  return Math.floor(Math.random() * 6) + 10;
}

// Start the event
OpeningCeremony({ red: 0, blue: 0, green: 0, yellow: 0 }, Race100M);
