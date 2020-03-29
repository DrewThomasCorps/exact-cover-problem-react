class Matrix {
    columns;
    rows;

    constructor(input) {
        this.columns = new LinkedList();
        this.rows = 0;
        for (let i = 1; i <= input[0].length; i++) {
            this.add_column();
        }
        input.forEach((row) => {
            this.add_row(row)
        });
    }

    add_column = () => {
        let column = new LinkedList();
        LinkedList.add_node_to_right(this.columns.head, column.head);
    };

    add_row = (list) => {
        this.rows++;
        let current_head = this.columns.head;
        let first_node = null;
        list.forEach((value) => {
            current_head = current_head.right;
            if (value === 1) {
                let node = new Node();
                node.value = this.rows;
                current_head.add_node_to_column(node);
                if (first_node === null) {
                    first_node = node;
                } else {
                    LinkedList.add_node_to_right(first_node, node);
                }
            }
        })
    };

    get_column_with_fewest_nodes = () => {
        let current_column = this.columns.head.right;
        let best_column = current_column;
        while (current_column !== this.columns.head) {
            if (current_column.total_nodes < best_column.total_nodes) {
                best_column = current_column;
            }
            current_column = current_column.right;
        }
        return best_column;
    };

    cover(node) {
        let cover_node = node;
        do {
            cover_node.head.left.right = cover_node.head.right;
            cover_node.head.right.left = cover_node.head.left;
            for (let row = cover_node.down; row !== cover_node; row = row.down) {
                if (row !== cover_node.head) {
                    for (let column = row.right; column !== row; column = column.right) {
                        column.head.total_nodes--;
                        column.up.down = column.down;
                        column.down.up = column.up;
                    }
                }
            }
            cover_node = cover_node.right;
        } while (cover_node !== node)
    }

    uncover(node) {
        let uncover_node = node.left;
        do {
            for (let row = uncover_node.up; row !== uncover_node; row = row.up) {
                if (row !== uncover_node.head) {
                    for (let column = row.left; column !== row; column = column.left) {
                        column.head.total_nodes++;
                        column.up.down = column;
                        column.down.up = column;
                    }
                }
            }
            uncover_node.head.left.right = uncover_node.head;
            uncover_node.head.right.left = uncover_node.head;
            uncover_node = uncover_node.left;
        } while (uncover_node !== node.left)
    }
}

class LinkedList {
    head;

    constructor() {
        this.head = new Head();
        this.head.head = this.head;
    }

    static add_node_to_right = (head, node) => {
        node.right = head;
        node.left = head.left;
        head.left.right = node;
        head.left = node;
    };
}

class Node {
    up;
    down;
    left;
    right;

    head;
    value;

    constructor() {
        this.up = this;
        this.down = this;
        this.left = this;
        this.right = this;
    }
}

class Head extends Node {
    total_nodes;

    constructor() {
        super();
        this.total_nodes = 0;
    }

    add_node_to_column = (node) => {
        node.head = this;
        node.up = this.up;
        node.down = this;
        this.up.down = node;
        this.up = node;
        this.total_nodes++;
    };

}

export default Matrix;