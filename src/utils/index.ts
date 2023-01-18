const get = (board: number[][], x: number, y: number) => {
    if(board[x] && board[x][y]){
        return board[x][y]
    } else {
        return 0
    }
}

export const transform = (board: number[][], x:number, y:number) => {
    const b: number[][] = []

    for (let i = 0; i < board.length; i++) {
        b.push([])
        for (let j = 0; j < board[i].length; j++) {
            b[i].push(get(board, i-y, j-x))
        }
    }

    return b
}