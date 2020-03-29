import React, {useEffect, useState} from 'react';
import Matrix from "./utilities/Matrix";
import DancingLinks from "./utilities/DancingLinks";
import './App.css';
import Pentomino from "./utilities/Pentomino";
import PentominoRenderer from "./components/PentominoRenderer";

function App() {

    let [pentomino, set_pentomino] = useState(null);
    let [row_rendered, set_row_rendered] = useState(null);

    useEffect(() => {
        set_pentomino(new Pentomino());
    }, []);


    useEffect(() => {
        if (pentomino === null) {
            return;
        }
        let matrix = new Matrix(pentomino.exact_cover_matrix);
        let links =new DancingLinks(matrix, set_row_rendered);
        set_row_rendered(links.final_solutions[2]);
    }, [pentomino]);

    return (
        row_rendered &&
        <div className="App">
            <PentominoRenderer board={pentomino.board} solutions_row={row_rendered}/>
        </div>
    );
}




export default App;
