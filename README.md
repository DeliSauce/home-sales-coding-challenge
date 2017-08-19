# Home sales coding challenge

For this problem, you are given N days of average home sale price data, and a fixed window size K . For each window of K days, from left to right, find the number of increasing subranges within the window minus the number of decreasing subranges within the window.

A window of days is defined as a contiguous range of days. Thus, there are exactly N-K+1 windows where this metric needs to be computed. An increasing subrange is defined as a contiguous range of indices [a,b], a < b , where each element is larger than the previous element. A decreasing subrange is similarly defined, except each element is smaller than the next.
Constraints

1 ≤ N ≤ 200,000 days
1 ≤ K ≤ N days
Input Format

Your solution should accept an input file (input.txt) with the following contents:

- Line 1: Two integers, N and K.
- Line 2: N positive integers of average home sale price, each less than 1,000,000.
Output Format

Your solution should output one integer for each window’s result, with each integer on a separate line, to an output file or to the console.

##### Sample Input:
5 3 <br>
188930 194123 201345 154243 154243

##### Sample Output:
3 <br>
0 <br>
-1 <br>


##### Explanation:

For the first window of [188930, 194123, 201345], there are 3 increasing subranges ([188930, 194123, 201345], [188930, 194123], and [194123, 201345]) and 0 decreasing, so the answer is 3. For the second window of [194123, 201345, 154243], there is 1 increasing subrange and 1 decreasing, so the answer is 0. For the third window of [201345, 154243, 154243], there is 1 decreasing subrange and 0 increasing, so the answer is -1.
Performance

The solution should run in less than 30 seconds and use less than 50MB of memory with a valid input of any size (within the given constraints).

#### Solution Description:
My submission includes both a naive and robust solution. It is written in Javascript, reads in from input.txt and outputs the result to the console. The naive solution iterates through each window and analyzes trends for every permutation within that window. This solution has terrible time complexity (O(N*K^3)), especially with large window (K) sizes, but was useful within small datasets as a check against the robust solution.

Robust solution: Linear time complexity O(N). This solution iterates through the entire dataset and keeps track of increasing/decreasing trends after each step in a "trendline" array [1]. When the iteration reaches the size of K, the number of subranges in the trendline is calculated [2] and provides the result for the first window. As the we continue iterating through the dataset only the first and last trends in the trendline are recalculated. We can calculate the value for subsequent windows based on the previous window's result and the change in first/last trends -- this avoids unnecessary calculations for extremely large K.

[1] A sample trendline might be [3, 0, -2] for K=7, which represents 4 days of consecutive increases, 2 days without change, and 3 days of consecutive decreases.

[2] Finding the number of subranges for consecutive days is trivial: n(n + 1)/2 --> where n: consecutive days minus one
