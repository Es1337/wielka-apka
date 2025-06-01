import { ExerciseType } from "../../types/TrainingTypes";
import { GoogleUser } from "../../types/UserTypes";
import "./Table.css"

interface TableProps {
    rowData: ExerciseType[];
    colData: GoogleUser[];
    addRowCallback: () => void;
}

const Table: React.FC<TableProps> = ({ rowData: rowData, colData: colData, addRowCallback: addRowCallback }) => {    
    console.log("Table rowData", rowData);
    console.log("Table colData", colData);
    return (
        <div className="table-container">
            
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        {colData.map((col) => <th>{col.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rowData.map((row) => 
                        <tr>
                            <td>
                                {row.name}
                            </td>
                            {row.sets.map((set) => <td className="actions">{set.weight}x{set.reps}</td>)}
                        </tr>
                    )}
                    <tr className="add-row">
                        <td onClick={addRowCallback} colSpan={colData.length + 1}><span className="add-row add"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table;