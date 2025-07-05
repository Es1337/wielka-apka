import _ from "lodash";
import { ExerciseType } from "../../../types/TrainingTypes";
import { GoogleUser } from "../../../types/UserTypes";
import "./Table.css"
import { useLocation, useNavigate } from "react-router-dom";

interface TableProps {
    rowData: ExerciseType[];
    colData: GoogleUser[];
    addRowCallback: () => void;
    handleRowClick: (exerciseName: string, exerciseIds: Object[]) => void;
}

const Table: React.FC<TableProps> = ({ rowData: rowData, colData: colData, addRowCallback: addRowCallback, handleRowClick: handleRowClick }) => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("Table rowData", rowData);
    console.log("Table colData", colData);
    
    // Sort by exercise name, then by user
    rowData.sort((a, b) => {
        const nameCompare = a.name.localeCompare(b.name);
        if (nameCompare !== 0) return nameCompare;
        return String(a.user._id).localeCompare(String(b.user._id));
    });

    let modifiedRowData = _.groupBy(rowData, 'name');

    console.log("Modified Row Data", modifiedRowData);

    return (
        <div className="training-container">

            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        {colData.map((col) => <th key={String(col._id)}>{col.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(modifiedRowData).map(([exerciseName, rows]) => (
                        <tr key={exerciseName} onClick={() => handleRowClick(exerciseName, rows.map(({_id}) => ({_id})))}>
                            <td>
                                {exerciseName}
                            </td>
                            {colData.map((col) => {
                                const userRow = rows.find((row) => row.user === col._id);
                                return (
                                    <td className="actions" key={String(col._id)}>
                                        {userRow
                                            ? userRow.sets.map((set, setIdx) => (
                                                <p key={`${col._id}-${setIdx}`}>{set.weight}x{set.reps}</p>
                                            ))
                                            : null}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    <tr className="add-row">
                        <td onClick={addRowCallback} colSpan={colData.length + 1}><span className="add-row add" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table;