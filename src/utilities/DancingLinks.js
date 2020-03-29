class DancingLinks {
    matrix;
    final_solutions = [];
    current_solution = [];

    constructor(matrix) {
        this.matrix = matrix;
        this.get_exact_cover_solutions();
    }

    get_exact_cover_solutions = () => {
        if (this.matrix.columns.head.right === this.matrix.columns.head) {
            this.final_solutions.push([...this.current_solution]);
            console.log(this.current_solution);
            return this.backtrack();
        }
        let chosen_column = this.matrix.get_column_with_fewest_nodes();
        if (chosen_column.total_nodes === 0) {
            return this.backtrack();
        }
        let node = chosen_column.down;
        this.matrix.cover(node);
        this.current_solution.push(node);
        return this.get_exact_cover_solutions(this.matrix);
    };

    backtrack = () => {
        let last_node = this.current_solution.pop();
        if (last_node === undefined) {
            return;
        }
        this.matrix.uncover(last_node);
        if (last_node.down === last_node.head) {
            return this.backtrack();
        } else {
            let node = last_node.down;
            this.matrix.cover(node);
            this.current_solution.push(node);
            this.get_exact_cover_solutions(this.matrix);
        }
    }
}

export default DancingLinks;