
"use client";

import { useState } from 'react';
import './chessBoard.css';
import { createInitialBoard, ChessPiece } from './chessPieces';
import { isValidMove } from './chessRules';

export default function ChessBoard() {
  const [board, setBoard] = useState(createInitialBoard());
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);

  const handleDragStart = (pieceKey, row, col) => {
    setDraggedPiece(pieceKey);
    setDraggedFrom({ row, col });
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = (e, targetRow, targetCol) => {
    e.preventDefault();
    
    if (draggedPiece && draggedFrom) {
      // Create move object
      const move = {
        from: draggedFrom,
        to: { row: targetRow, col: targetCol }
      };
      
      if (isValidMove(move, draggedPiece, board)) {
        const newBoard = [...board];
        // Remove piece from original position
        newBoard[draggedFrom.row][draggedFrom.col] = null;
        // Place piece in new position
        newBoard[targetRow][targetCol] = draggedPiece;
        
        setBoard(newBoard);
      }
      // If move is invalid, piece will snap back (no board update)
    }
    
    // Reset drag state
    setDraggedPiece(null);
    setDraggedFrom(null);
  };

  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="chess-row">
          {row.map((pieceKey, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 0;
            return (
              <div 
                key={colIndex} 
                className={`chess-cell ${isLight ? 'light' : 'dark'}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, rowIndex, colIndex, isValidMove)}
              >
                <ChessPiece 
                  pieceKey={pieceKey} 
                  onDragStart={(pieceKey, e) => handleDragStart(pieceKey, rowIndex, colIndex)}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
