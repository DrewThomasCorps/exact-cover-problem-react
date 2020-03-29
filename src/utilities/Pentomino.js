class Pentomino {

    board;
    exact_cover_matrix;

    constructor() {
        this.board = new Board();
        this.exact_cover_matrix = this.construct_exact_cover_matrix();
    }

    construct_exact_cover_matrix = () => {
        let matrix = [];
        this.board.possible_tile_placements.forEach((tile, tile_index) => {
            tile.forEach(placement => {
                let columns = placement.map(position => this.board.get_number_from_position(position));
                matrix.push([]);
                for (let column = 0; column < 72; column++){
                    matrix[matrix.length -1].push(0);
                }
                matrix[matrix.length-1][tile_index] = 1;
                columns.forEach(column => matrix[matrix.length-1][column+11] = 1)
            });
        });
        return matrix;
    };

    static get_tiles = () => {
        const tile_one = new Tile([
            {row: 1, column: 1},
            {row: 1, column: 2},
            {row: 1, column: 3},
            {row: 1, column: 4},
            {row: 1, column: 5}
        ]);
        const tile_two = new Tile([
            {row: 1, column: 1},
            {row: 1, column: 2},
            {row: 2, column: 2},
            {row: 2, column: 3},
            {row: 3, column: 2}
        ]);
        const tile_three = new Tile([
            {row: 1, column: 1},
            {row: 1, column: 2},
            {row: 1, column: 3},
            {row: 1, column: 4},
            {row: 2, column: 4}
        ]);
        const tile_four = new Tile([
            {row: 1, column: 1},
            {row: 1, column: 2},
            {row: 1, column: 3},
            {row: 2, column: 1},
            {row: 2, column: 2}
        ]);
        const tile_five = new Tile([
            {row: 1, column: 1},
            {row: 1, column: 2},
            {row: 1, column: 3},
            {row: 2, column: 3},
            {row: 2, column: 4}
        ]);
        const tile_six = new Tile([
            {row: 1, column: 1},
            {row: 1, column: 2},
            {row: 1, column: 3},
            {row: 2, column: 2},
            {row: 3, column: 2}
        ]);
        const tile_seven = new Tile([
            {row: 1, column: 1},
            {row: 1, column: 2},
            {row: 1, column: 3},
            {row: 2, column: 1},
            {row: 2, column: 3}
        ]);
        const tile_eight = new Tile([
            {row: 1, column: 1},
            {row: 1, column: 2},
            {row: 1, column: 3},
            {row: 2, column: 1},
            {row: 3, column: 1}
        ]);
        const tile_nine = new Tile([
            {row: 1, column: 1},
            {row: 2, column: 1},
            {row: 2, column: 2},
            {row: 3, column: 2},
            {row: 3, column: 3}
        ]);
        const tile_ten = new Tile([
            {row: 1, column: 2},
            {row: 2, column: 1},
            {row: 2, column: 2},
            {row: 2, column: 3},
            {row: 3, column: 2}
        ]);
        const tile_eleven = new Tile([
            {row: 1, column: 1},
            {row: 1, column: 2},
            {row: 1, column: 3},
            {row: 1, column: 4},
            {row: 2, column: 2}
        ]);
        const tile_twelve = new Tile([
            {row: 1, column: 1},
            {row: 1, column: 2},
            {row: 2, column: 2},
            {row: 3, column: 2},
            {row: 3, column: 3}
        ]);
        return [tile_one, tile_two, tile_three, tile_four, tile_five, tile_six, tile_seven, tile_eight, tile_nine, tile_ten, tile_eleven, tile_twelve];
    }
}

class Tile {

    initial_placement;
    current_placement;
    possible_placements = [];

    constructor(initial_placement) {
        this.initial_placement = initial_placement;
        this.current_placement = [];
        this.get_possible_positions();
    }

    get_possible_positions = () => {
        this.add_rotations();
        this.flip();
        if (this.possible_placements.find(placement => this.placements_are_the_same(placement, this.current_placement)) === undefined) {
            this.initial_placement = this.current_placement;
            this.current_placement = [];
            this.add_rotations();
        }
    };

    add_rotations = () => {
        while (!this.placements_are_the_same(this.current_placement, this.initial_placement)) {
            this.rotate();
            this.possible_placements.push(this.current_placement)
        }
    };

    rotate = () => {
        if (this.current_placement.length === 0) {
            this.current_placement = [...this.initial_placement];
        }
        let positions = [...this.current_placement];
        let first = positions.shift();
        let new_placement = positions.map(position => {
            let difference = this.compare_positions(first, position);
            return this.invert(first, difference);
        });
        new_placement = [first, ...new_placement];
        new_placement = this.shift_placement_closest(new_placement, "row");
        new_placement = this.shift_placement_closest(new_placement, "column");
        this.current_placement = new_placement;
    };

    compare_positions = (first, second) => {
        return {
            right: (second.column - first.column),
            down: (second.row - first.row)
        }
    };

    invert = (position, difference) => {
        return {
            row: (position.row + difference.right),
            column: (position.column - difference.down)
        }
    };

    flip = () => {
        let positions = [...this.initial_placement];
        let first = positions.shift();
        let new_placement = positions.map(position => {
            let difference = this.compare_positions(first, position);
            return {...position, column: first.column - difference.right}
        });
        new_placement = [first, ...new_placement];
        new_placement = this.shift_placement_closest(new_placement, "row");
        new_placement = this.shift_placement_closest(new_placement, "column");
        this.current_placement = new_placement;
    };

    shift_placement_closest = (placement, direction) => {
        while (placement.some(position => position[direction] < 1)) {
            placement = placement.map(position => {
                return {...position, [direction]: position[direction] + 1}
            })
        }
        while (placement.every(position => position[direction] > 1)) {
            placement = placement.map(position => {
                return {...position, [direction]: position[direction] - 1}
            })
        }
        return placement;
    };

    placements_are_the_same = (a, b) => {
        a = [...a];
        b = [...b];
        let position = a.pop();
        if (position === undefined) {
            return false;
        }
        while (position !== undefined) {
            let current = {...position};
            if (b.find(element => {
                return (element.row === current.row && element.column === current.column)
            }) === undefined) {
                return false;
            }
            position = a.pop();
        }
        return true;
    }


}

class Board {
    board = [];
    possible_tile_placements = [];
    zero_count_before_position_map;

    constructor() {
        for (let row = 0; row < 6; row++) {
            this.board.push([]);
            for (let column = 1; column <= 10; column++) {
                // if (row >= 3 && row <= 4 && column >= 4 && column <= 5){
                //     this.board[row].push(0);
                // } else {
                    this.board[row].push((row * 11) + column);
                // }
            }
        }
        this.zero_count_before_position_map = new Map();
        this.get_zero_count_before_position();
        let tiles = Pentomino.get_tiles();
        tiles.forEach(tile => this.possible_tile_placements.push(this.get_placements_for_all_tile_positions(tile)));
    }

    get_placements_for_all_tile_positions = (tile) => {
        let placements = [];
        tile.possible_placements.forEach(placement => placements.push(...this.get_placements_for_tile(placement)));
        return placements;
    };

    get_placements_for_tile = (tile) => {
        let placements = [];
        let left_tile = [...tile];
        while (left_tile.every(position => position.column <= this.columns())) {
            tile = [...left_tile];
            while (tile.every(position => position.row <= this.rows())) {
                if (tile.every(position => this.board[position.row - 1][position.column - 1] !== 0)) {
                    placements.push(tile);
                }
                tile = tile.map(placement => {
                    return {...placement, row: placement.row + 1}
                })
            }
            left_tile = left_tile.map(placement => {
                return {...placement, column: placement.column + 1}
            })
        }
        return placements;
    };

    get_number_from_position = (position) => {
        let number = (((position.row - 1) * this.columns()) + position.column);
        let zeros = this.zero_count_before_position_map.get(number);
        return number - zeros;
    };

    get_zero_count_before_position = () => {
        let count = 0;
        let zeros = 0;
        for (let row = 0; row < this.rows(); row++){
            for (let column = 0; column < this.columns(); column++){
                count++;
                if (this.board[row][column] === 0) {
                    zeros++;
                }
                this.zero_count_before_position_map.set(count, zeros)
            }
        }
    };

    rows = () => {
        return this.board.length;
    };

    columns = () => {
        return this.board[0].length
    };


}

export default Pentomino