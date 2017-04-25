const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('test-input.txt')
});

var arr = [];

rl.on('line', (line) => {
  arr.push(line);
}).on('close',() => {
  const N = parseInt(arr[0].slice(0, arr[0].indexOf(" ")));
  const K = parseInt(arr[0].slice(arr[0].indexOf(" ") + 1));

  const values = arr[1].split(" ").map((num) => parseInt(num));

  console.log("total values (N): ", N);
  console.log("window size (K): ", K);

  let robust = getRobustSolution(N, K, values);
  robust.forEach((num) => console.log(num));
  // let naive = getNaiveSolution(N, K, values);
  // console.log(compareSolutions(robust, naive));
});

function compareSolutions(a,b) {
  if (a.length !== b.length) return false;
  for(let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

////////////////////// ROBUST SOLUTION /////////////////////
function getRobustSolution(N, K, values) {
  let date = new Date();
  const trends = [];
  const robustSolution = [];
  let sequenceValue;

  let sequenceHash = {1: 1};
  for (let i = 2; i <= K; i++) {
    let nextVal = i + 1;
    sequenceHash[i] = sequenceHash[i - 1] + i;
  }

  let correction = 0;
  for(let i = 0; i < N - 1; i++) {
    sequenceValue = segmentTrend(i, i + 1);
    correction = 0;
    //shift from beginning
    if (i >= K - 1) {
      correction -= trends[0];
      if (trends[0] >= -1 && trends[0] <= 1) {
        trends.shift();
      } else {
        trends[0] -= 1 * trends[0] / Math.abs(trends[0]);
      }
    }

    //push to end
    if (trends.length === 0) {
      trends.push(sequenceValue);
    } else if (trends[trends.length - 1] * sequenceValue > 0) {
      trends[trends.length - 1] += sequenceValue;
    } else {
      trends.push(sequenceValue);
    }
    correction += trends[trends.length - 1];

    //tally
    if (i === K - 2) {
      tallyTotals();
    }
    if (i > K - 2) {
      robustSolution.push(robustSolution[robustSolution.length - 1] + correction);
    }
  }

  function tallyTotals() {
    let total = 0;
    trends.forEach((n) => {
      if (n > 0) {
        total += sequenceHash[n];
      } else if (n < 0) {
        total -= sequenceHash[-n];
      }
    });
    robustSolution.push(total);
  }

  function segmentTrend(a,b) {
    if (values[a] > values[b]) {
      return -1;
    } else if (values[a] < values[b]) {
      return 1;
    } else
      return 0;
  }
  let newDate = new Date();
  console.log("time: ", (newDate - date)/1000);
  return robustSolution;
}


//////////////// NAIVE SOLUTION ////////////////
function getNaiveSolution(N, K, values) {
  let date = new Date();
  const naiveSolution = [];

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
    naiveSolution.push(total);
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

  function stepTrend(a,b) {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else return 0;
  }
  let newDate = new Date();
  console.log("time: ", (newDate - date)/1000);
  return naiveSolution;
}
