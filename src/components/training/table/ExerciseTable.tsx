import _, { Dictionary } from "lodash";
import { ExerciseType, SetType } from "../../../types/TrainingTypes";
import { GoogleUser } from "../../../types/UserTypes";
import "./ExerciseTable.css"

interface ExerciseTableProps {
    rowData: Dictionary<ExerciseType[]>;
    colData: GoogleUser[];
    addRowCallback: (userId: Object) => void;
}

const ExerciseTable: React.FC<ExerciseTableProps> = ({ rowData: rowData, colData: colData, addRowCallback: addRowCallback }) => {

    function handleRowClick() {
        // This function can be used to handle row clicks if needed
        // For now, it does nothing
    }

    return (
        <div className="table-container">
            {Object.entries(rowData).map(([userId, exercise]) => (
                <div key={userId} className="user-column">
                    <span className="column-header">{colData.find((user) => user._id === userId).name}</span>
                    <div key={`${userId}-sets`}>
                        {exercise[0].sets.map((set: SetType, setIdx: number) => (
                            <div key={`${userId}-${set.count}`} className="set-row" onClick={() => handleRowClick()}>
                                <span className="set-weight">{set.weight} kg x </span>
                                <span className="set-reps">{set.reps}</span>
                            </div>
                        ))}
                        <div className="add-row" onClick={() => addRowCallback({ _id: userId })}>
                            <span className="add" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ExerciseTable;