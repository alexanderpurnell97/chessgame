import Image from "next/image"

import rookW from "@/public/assets/rook_w.svg"
import rookb from "@/public/assets/rook_b.svg"
import knightW from "@/public/assets/knight_w.svg"
import knightB from "@/public/assets/knight_b.svg"
import queenW from "@/public/assets/queen_w.svg"
import queenB from "@/public/assets/queen_b.svg"
import pawnW from "@/public/assets/pawn_w.svg"
import pawnB from "@/public/assets/pawn_b.svg"
import bishopW from "@/public/assets/bishop_w.svg"
import bishopB from "@/public/assets/bishop_b.svg"
import kingW from "@/public/assets/king_w.svg"
import kingB from "@/public/assets/king_b.svg"

export const pieces = {
    'rook_w':{type: 'rook', colour: 'white', image: rookW},
    'rook_b':{type: 'rook', colour: 'black', image: rookb},
    'knight_w':{type: 'knight', colour: 'white', image: knightW},
    'knight_b':{type: 'knight', colour: 'black', image: knightB},
    'bishop_w':{type: 'bishop', colour: 'white', image: bishopW},
    'bishop_b':{type: 'bishop', colour: 'black', image: bishopB},
    'queen_w':{type: 'queen', colour: 'white', image: queenW},
    'queen_b':{type: 'queen', colour: 'black', image: queenB},
    'king_w':{type: 'king', colour: 'white', image: kingW},
    'king_b':{type: 'king', colour: 'black', image: kingB},
    'pawn_w':{type: 'pawn', colour: 'white', image: pawnW},
    'pawn_b':{type: 'pawn', colour: 'black', image: pawnB}
}

export const createInitialBoard = () => {
    const board = Array(8).fill(null).map(() => Array(8).fill(null));
    board[0] = ['rook_b', 'knight_b', 'bishop_b', 'king_b', 'queen_b', 'bishop_b', 'knight_b', 'rook_b'];
    board[1] = Array(8).fill('pawn_b');

    board[6] = Array(8).fill('pawn_w');
    board[7] = ['rook_w', 'knight_w', 'bishop_w',  'king_w', 'queen_w', 'bishop_w', 'knight_w', 'rook_w'];

    return board;
}

export const getPiece = (pieceKey) => {
    return pieceKey ? pieces[pieceKey] : null;
};

export const ChessPiece = ({ pieceKey, onDragStart, onDragEnd }) => {
    const piece = getPiece(pieceKey);
    if (!piece) return null;
    
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', pieceKey);
        if (onDragStart) onDragStart(pieceKey, e);
    };
    
    const handleDragEnd = (e) => {
        if (onDragEnd) onDragEnd(pieceKey, e);
    };
    
    return (
        <Image 
            src={piece.image}
            alt={`${piece.colour} ${piece.type}`}
            className="chess-piece"
            draggable={true}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ cursor: 'grab' }}
        />
    )
};