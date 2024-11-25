const movesets = [[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[-1,-2],[1,-2],[2,-1]];

let result = [];

let temp = [];

let vis = new Array(8).fill(0).map(() => new Array(8).fill(0));

function dfs(row,col,target_row,target_col) {
    vis[row][col] = 1;
    console.log(`${row,col}`)
    for(let i = 0; i < 8; i++) {
        let n_row = movesets[i][0] + row;
        let n_col = movesets[i][1] + col;
        if(n_row >= 0 && n_row < 8 && n_col >= 0 && n_col < 8 && vis[n_row][n_col] !== 1) {
            dfs(n_row,n_col,target_row,target_col)
        }
    }
    vis[row][col] = 0; 
}

function bfs(row,col,target_row,target_col) {
    let queue = [];
    queue.push([[row,col],[[row,col]]]);
    while(queue.length !== 0) {
        let node = queue.shift();
        for(let i = 0; i<8; i++) {
            let n_row = movesets[i][0] + node[0][0];
            let n_col = movesets[i][1] + node[0][1];
            if(n_row >= 0 && n_row < 8 && n_col >= 0 && n_col < 8 && vis[n_row][n_col] !== 1) {
                if(n_row === target_row && n_col === target_col) {
                    result = [...node[1],[n_row,n_col]];
                    return;
                }
                queue.push([[n_row,n_col],[...node[1],[n_row,n_col]]]);
            }
        }
    }
}

bfs(0,0,7,7);

function KnightsMoves(start_move, ending_move) {
    result = [];
    
    let row = start_move[0];
    let col = start_move[1];

    let target_row = ending_move[0];
    let target_col = ending_move[1];

    bfs(row,col,target_row,target_col);

    return result;
}

console.log(KnightsMoves([3,3],[4,3]));

