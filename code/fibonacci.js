let dp = [0,1]

function fib(n, dp) {
    if(n == 0) {
        return 0;
    }

    if(n == 1) {
        return 1;
    }

    return dp[n] = (fib(n-1,dp) + fib(n-2,dp));
}

fib(7,dp);

console.log(dp);