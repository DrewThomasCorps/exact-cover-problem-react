import React, {useEffect, useState} from 'react';
import Matrix from "./utilities/Matrix";
import DancingLinks from "./utilities/DancingLinks";
import './App.css';
import Pentomino from "./utilities/Pentomino";
import PentominoRenderer from "./components/PentominoRenderer";

function App() {

    let [pentomino, set_pentomino] = useState(null);
    let [dancing_links, set_dancing_links] = useState(null);
    let [interval_time, set_interval_time] = useState({current: 10, previous: 10});
    let [row_rendered, set_row_rendered] = useState(null);

    useEffect(() => {
        set_pentomino(new Pentomino());
    }, []);

    useEffect(() => {
        if (dancing_links !== null) {
            const interval = setInterval(() => {
                if (dancing_links.found_final_solutions) {
                    dancing_links.found_final_solutions = false;
                    set_interval_time({...interval_time, current: 1000});
                } else {
                    dancing_links.should_run = true;
                    dancing_links.next_to_run();
                    set_interval_time({...interval_time, current: interval_time.previous})
                }
            }, interval_time.current);
            return () => clearInterval(interval);
        }
    }, [dancing_links, interval_time]);


    useEffect(() => {
        if (pentomino === null) {
            return;
        }
        let matrix = new Matrix(pentomino.exact_cover_matrix);
        set_dancing_links(new DancingLinks(matrix, set_row_rendered));
    }, [pentomino]);

    return (
        row_rendered &&
        <div className="App">
            <PentominoRenderer board={pentomino.board} solutions_row={row_rendered}/>
            <input value={interval_time.current} onChange={(e) => {
                let value = parseInt(e.target.value);
                if (isNaN(value)){
                    value = 0;
                }
                set_interval_time({current: value, previous: value})
            }}/>
        </div>
    );
}




export default App;
