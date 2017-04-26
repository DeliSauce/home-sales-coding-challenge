const readline = require('readline');
const fs = require('fs');
let start = new Date();

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

var data = [];

rl.on('line', (line) => {
  data.push(line);
}).on('close',() => {
  const N = parseInt(data[0].slice(0, data[0].indexOf(" ")));
  const K = parseInt(data[0].slice(data[0].indexOf(" ") + 1));
  const values = data[1].split(" ").map((num) => parseInt(num));

  let robust = getRobustSolution(N, K, values);
  robust.forEach((num) => console.log(num));
  // let naive = getNaiveSolution(N, K, values);
  // console.log(compareSolutions(robust, naive));
});

// Equivaliance comparison: Robust vs Naive Solution
function compareSolutions(a,b) {
  if (a.length !== b.length) return false;
  for(let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/////////////////////////// ROBUST SOLUTION //////////////////////////
function getRobustSolution(N, K, values) {
  const segmentTrends = [];
  const solution = [];
  let stepTrend;
  let segmentShift = 0;

  //iterate through entire dataset
  for(let i = 0; i < N - 1; i++) {
    stepTrend = getTrend(values[i], values[i + 1]);
    segmentShift = 0;

    //remove stepTrend from beginning trendline
    if (i >= K - 1) {
      segmentShift -= segmentTrends[0];
      if (segmentTrends[0] >= -1 && segmentTrends[0] <= 1) {
        segmentTrends.shift();
      } else {
        segmentTrends[0] -= 1 * segmentTrends[0] / Math.abs(segmentTrends[0]);
      }
    }

    //push stepTrend to end of trendline
    if (segmentTrends.length === 0) {
      segmentTrends.push(stepTrend);
    } else if (segmentTrends[segmentTrends.length - 1] * stepTrend > 0) {
      segmentTrends[segmentTrends.length - 1] += stepTrend;
    } else {
      segmentTrends.push(stepTrend);
    }
    segmentShift += segmentTrends[segmentTrends.length - 1];

    //calculate value of trend permutations for the first window
    if (i === K - 2) {
      let trendTotal = 0;
      segmentTrends.forEach((n) => {
        if (n > 0) {
          trendTotal += n * (n + 1)/2;
        } else if (n < 0) {
          trendTotal -= -n * (-n + 1)/2;
        }
      });
      solution.push(trendTotal);
    }

    //calculate value of trend permutations for subsequent windows
    if (i > K - 2) {
      let nextSegmentValue = solution[solution.length - 1] + segmentShift;
      solution.push(nextSegmentValue);
    }
  }

  function getTrend(prev, next) {
    if (prev > next) {
      return -1;
    } else if (prev < next) {
      return 1;
    } else
      return 0;
  }

  return solution;
}


////////////////////////// NAIVE SOLUTION //////////////////////////
function getNaiveSolution(N, K, values) {
  const solution = [];

  for(let i = 0; i <= N - K; i++) {
    updateSolution(values.slice(i, i + K));
  }

  function updateSolution(range) {
    let total = 0;
    let subrangeSize = 2;
    while(subrangeSize <= range.length) {
      for(let i = 0; i <= range.length - subrangeSize; i++) {
        total += rangeTrend(range.slice(i, i + subrangeSize));
      }
      subrangeSize++;
    }
    solution.push(total);
  }

  function rangeTrend(subrange) {
    let trend;
    for (let i = 0; i < subrange.length - 1; i++) {
      if (i === 0) {
        trend = stepTrend(subrange[i], subrange[i + 1]);
      } else {
        if (trend !== stepTrend(subrange[i], subrange[i + 1])) {
          return 0;
        }
      }
    }
    return trend;
  }

  function stepTrend(prev,next) {
    if (prev < next) {
      return 1;
    } else if (prev > next) {
      return -1;
    } else return 0;
  }

  return solution;
}
