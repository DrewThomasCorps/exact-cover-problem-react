class DancingLinks {
    matrix;
    final_solutions = [];
    current_solution = [];

    constructor(matrix) {
        this.matrix = matrix;
        this.get_exact_cover_solutions();
        this.get_next_solution();
    }

    get_next_solution = () => {
        while (this.backtrack()) {
            this.get_exact_cover_solutions();
        }
    };

    get_exact_cover_solutions = () => {
        while (this.matrix.columns.head.right !== this.matrix.columns.head) {
            let chosen_column = this.matrix.get_column_with_fewest_nodes();
            if (chosen_column.total_nodes === 0) {
                if(this.backtrack()){
                    continue;
                } else {
                    return;
                }
            }
            let node = chosen_column.down;
            this.matrix.cover(node);
            this.current_solution.push(node);
        }
        this.final_solutions.push([...this.current_solution]);
    };

    backtrack = () => {
        let last_node = this.uncover_current_node();
        while (last_node && last_node.down === last_node.head) {
            last_node = this.uncover_current_node();
        }
        if (!last_node) {
            return false;
        }
        let node = last_node.down;
        this.matrix.cover(node);
        this.current_solution.push(node);
        return true
    };

    uncover_current_node = () => {
        let last_node = this.current_solution.pop();
        if (last_node === undefined) {
            return false;
        }
        this.matrix.uncover(last_node);
        return last_node;
    }
}

export default DancingLinks;