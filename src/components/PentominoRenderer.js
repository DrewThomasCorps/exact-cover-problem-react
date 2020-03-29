import React, {useCallback, useEffect, useState} from "react";

let PentominoRenderer = ({board, solutions_row}) => {
    const [tiles, setTiles] = useState(null);

    let empty_board = useCallback(() => {
        let empty_board_rows = [];
        for (let row = 1; row <= board.rows(); row++) {
            empty_board_rows.push([]);
            for (let column = 1; column <= board.columns(); column++) {
                if (board.board[row - 1][column - 1] === 0){
                    empty_board_rows[row-1].push({color: "#FFFFFF"})
                } else {
                    empty_board_rows[row - 1].push({color: "#AAAAAA"})
                }
            }
        }
        return empty_board_rows;
    }, [board]);

    useEffect(() => {
        let colored_tiles = [...empty_board()];
        if (colored_tiles.length === 0) {
            return;
        }
        solutions_row.forEach(node => {
            let color_node = find_color_node(node);
            let tile = color_node.right;
            while (tile !== color_node) {
                colored_tiles[tile.head.value.row - 1][tile.head.value.column - 1] = color_node.head.value;
                tile = tile.right;
            }
        });
        setTiles(colored_tiles);
    }, [solutions_row, empty_board]);

    let find_color_node = (node) => {
        while (node.head.value.color === undefined) {
            node = node.right;
        }
        return node;
    };

    return tiles && tiles.map((row, index) => {
        return <div key={index} style={{height: "30px"}}>
            {row.map((column, index) => {
                return <div key={index} style={{background: column.color, height: "30px", width: "30px", display:"inline-block", margin: "0"}}/>
            })}
        </div>
    })


};

export default PentominoRenderer;

