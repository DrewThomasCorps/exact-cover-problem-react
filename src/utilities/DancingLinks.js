class DancingLinks {
    matrix;
    set_row_rendered;
    should_run = true;
    next_to_run;
    found_final_solutions = false;
    final_solutions = [];
    current_solution = [];

    constructor(matrix, set_row_rendered) {
        this.matrix = matrix;
        this.set_row_rendered = set_row_rendered;
        this.get_exact_cover_solutions();
    }

    get_exact_cover_solutions = () => {
        while (this.matrix.columns.head.right !== this.matrix.columns.head) {
            if (!this.should_run) {
                return;
            }
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
            this.set_row_rendered([...this.current_solution]);
            this.should_run = false;
            this.next_to_run = this.get_exact_cover_solutions;
        }
        this.final_solutions.push([...this.current_solution]);
        this.found_final_solutions = true;
        this.next_to_run = this.backtrack;
    };

    backtrack = () => {
        return this.uncover_current_node();
    };

    uncover_current_node = () => {
        let last_node = this.current_solution.pop();
        if (last_node === undefined) {
            this.next_to_run = () => {};
            return false;
        }
        this.matrix.uncover(last_node);
        this.set_row_rendered([...this.current_solution]);
        this.should_run = false;
        if (last_node.down === last_node.head) {
            this.next_to_run = this.uncover_current_node;
        } else {
            this.next_to_run = () => {this.cover_node(last_node.down)}
        }
        return last_node;
    };

    cover_node = (node) => {
        this.matrix.cover(node);
        this.current_solution.push(node);
        this.set_row_rendered([...this.current_solution]);
        this.should_run = false;
        this.next_to_run = this.get_exact_cover_solutions;
    }
}

export default DancingLinks;