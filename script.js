const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

var arr = [];

rl.on('line', (line) => {
  arr.push(line);
}).on('close',() => {
  const N = arr[0].slice(0, arr[0].indexOf(" "));
  const K = arr[0].slice(arr[0].indexOf(" ") + 1);

  const values = arr[1].split(" ").map((num) => parseInt(num));

  const trends = [];

  //trends version 1
  // for(let i = 0; i < N - 1; i++) {
  //   if (values[i] > values[i + 1]) {
  //     trends.push(-1);
  //   } else if (values[i] < values[i + 1]) {
  //     trends.push(1);
  //   } else trends.push(0);
  // }

  //trends version 2
  const solution = [];
  let sequenceValue;
  let sequenceHash = {1: 1,
    2: 3,
    3: 6,
    4: 10,
    5: 15,
    6: 21};


  for(let i = 0; i < N - 1; i++) {
    sequenceValue = segmentTrend(i, i + 1);

    //pop
    if (i >= K - 1) {
      if (trends[0] >= -1 && trends[0] <= 1) {
        trends.shift();
      } else {
        trends[0] -= 1 * trends[0] / Math.abs(trends[0]);
      }
    }

    //push
    if (trends.length === 0) {
      trends.push(sequenceValue);
    } else if (trends[trends.length - 1] * sequenceValue > 0) {
      trends[trends.length - 1] += sequenceValue;
    } else {
      trends.push(sequenceValue);
    }

    //tally
    if (i >= K - 2) {
      tallyTotals();
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
    solution.push(total);
  }

  function segmentTrend(a,b) {
    if (values[a] > values[b]) {
      return -1;
    } else if (values[a] < values[b]) {
      return 1;
    } else
      return 0;
  }

  console.log("total values (N): ", N);
  console.log("window size (K): ", K);
  console.log("values: ", values);
  console.log(solution);

  // let windows = new Array(N - K + 1).fill(0);
  // console.log(windows);
  //
  // let trend;

  //one possible solution could be to find a range of increase
  // const up = [];
  // const down = [];
  // let prevNum;
  //
  // values.forEach((n, i) => {
  //   if (i === 0) {
  //     prevNum = n;
  //   } else {
  //
  //   }
  // });

  // //naive solution
  // for(let i = 0; i < values.length - K; i++) {
  //
  //   for(let j = i + 1; j < i + K; j++) {
  //     if (j - i === 1) {
  //       trend = getTrend(i,i + 1);
  //     } else if (trend !== getTrend(j - 1, j)) {
  //       trend = 0;
  //     }
  //     if (trend === 0) break;
  //     addToSolution(trend, i, j - i + 1);
  //   }
  //
  // }
  //
  //
  //
  // //need to figure out this
  // function addToSolution(sequenceValue, startIndex, segmentLength) {
  //   for(let i = 0; i <= segmentLength; i++) {
  //     let index = startIndex + i;
  //     if (index >= 0 && index < windows.length) windows[index] += sequenceValue;
  //   }
  // }
  //
  // function getTrend(a,b) {
  //   if (values[a] < values[b]) {
  //     return 1;
  //   } else if (values[a] > values[b]) {
  //     return -1;
  //   } else return 0;
  // }


});
