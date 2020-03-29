import React, {useEffect, useState} from 'react';
import Matrix from "./utilities/Matrix";
import DancingLinks from "./utilities/DancingLinks";
import './App.css';
import Pentomino from "./utilities/Pentomino";

function App() {

    let [final_solutions, set_final_solutions] = useState(null);


    useEffect(() => {
        const input = [
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 1],
            [0, 0, 1, 0, 0, 1, 0],
            [0, 0, 1, 0, 1, 1, 0],
            [0, 1, 1, 0, 0, 1, 1],
            [0, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1],
            [0, 1, 0, 0, 0, 0, 1]
        ];
        let pentomino = new Pentomino();
        let matrix = new Matrix(pentomino.exact_cover_matrix);
        console.log(pentomino.exact_cover_matrix);
        let solver = new DancingLinks(matrix);
        console.log(solver.final_solutions);
        set_final_solutions(solver.final_solutions);
    }, []);

    return (
        final_solutions &&
        <div className="App">
            {final_solutions.map((solution, index) => {
                return <React.Fragment key={index}>
                    {solution.map((node, index) => {
                        return <span key={index} style={{border: "1px solid black", padding: "7px"}}>{node.value}</span>
                    })}
                    <hr/>
                </React.Fragment>
            })}
        </div>
    );
}




export default App;
