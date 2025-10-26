

export type Position = {
    row: number;
    col: number;
}

export type Move = {
    from: Position;
    to: Position;
}


const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export const positionToNotation = (row: number, col: number): string => {
    return FILES[col] + RANKS[row];
};


export const notationToPosition = (notation: string): Position => {
    const file = notation[0]; // 'a'
    const rank = notation[1]; // '8'
    
    const col = FILES.indexOf(file);
    const row = RANKS.indexOf(rank);
    
    return { row, col };
};

export const isValidPosition = (row: number, col: number): boolean => {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
};

export const getAllPositions = (): Position[] => {
    const positions: Position[] = [];
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            positions.push({ row, col });
        }
    }
    return positions;
};

const getPieceType = (pieceKey: string): string => {
    return pieceKey.split('_')[0];
}

const getPieceColor = (pieceKey: string): 'white' | 'black' => {
    return pieceKey.endsWith('_w') ? 'white' : 'black';
}
const isValidMove = (move: Move, pieceKey: string, board: (string | null)[][]) => {
    const pieceType = getPieceType(pieceKey);
    const pieceColor = getPieceColor(pieceKey);
    
    if (!isValidPosition(move.to.row, move.to.col)) return false;
    switch (pieceType) {
        case 'pawn':
            return isValidPawnMove(move, pieceColor, board);
        case 'rook':
            return isValidRookMove(move, pieceColor, board);
        case 'knight':
            return isValidKnightMove(move, pieceColor, board);
        case 'bishop':
            return isValidBishopMove(move, pieceColor, board);
        case 'queen':
            return isValidQueenMove(move, pieceColor, board);
        case 'king':
            return isValidKingMove(move, pieceColor, board);
        default:
            return false;
    }
}

const isValidPawnMove = (move: Move, pieceColor: 'white' | 'black', board: (string | null)[][]): boolean => {
    const { from, to } = move;
    const direction = pieceColor === 'white' ? -1 : 1;
    const startRow = pieceColor === 'white' ? 6 : 1; 
    
    const rowDiff = to.row - from.row;
    const colDiff = Math.abs(to.col - from.col);
    
    if (colDiff === 0) {
        if (board[to.row][to.col] !== null) return false; // Path blocked
        if (rowDiff === direction) return true; // One square forward
        if (from.row === startRow && rowDiff === 2 * direction) return true; // Two squares from start
    }
    
    // Diagonal capture
    if (colDiff === 1 && rowDiff === direction) {
        return board[to.row][to.col] !== null;
    }
    
    return false;
};

const isValidRookMove = (move: Move, pieceColor: 'white' | 'black', board: (string | null)[][]): boolean => {
    const { from, to } = move;
    
    if (from.row !== to.row && from.col !== to.col) return false;

    return isPathClear(from, to, board);
};

const isValidKnightMove = (move: Move, pieceColor: 'white' | 'black', board: (string | null)[][]): boolean => {
    const { from, to } = move;
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
};

const isValidBishopMove = (move: Move, pieceColor: 'white' | 'black', board: (string | null)[][]): boolean => {
    const { from, to } = move;
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    
    if (rowDiff !== colDiff) return false;
    
    return isPathClear(from, to, board);
};

const isValidQueenMove = (move: Move, pieceColor: 'white' | 'black', board: (string | null)[][]): boolean => {

    return isValidRookMove(move, pieceColor, board) || isValidBishopMove(move, pieceColor, board);
};

const isValidKingMove = (move: Move, pieceColor: 'white' | 'black', board: (string | null)[][]): boolean => {
    const { from, to } = move;
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    

    return rowDiff <= 1 && colDiff <= 1;
};

const isPathClear = (from: Position, to: Position, board: (string | null)[][]): boolean => {
    const rowStep = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
    const colStep = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;
    
    let currentRow = from.row + rowStep;
    let currentCol = from.col + colStep;
    
    while (currentRow !== to.row || currentCol !== to.col) {
        if (board[currentRow][currentCol] !== null) return false;
        currentRow += rowStep;
        currentCol += colStep;
    }
    
    return true;
};

export { isValidMove };
