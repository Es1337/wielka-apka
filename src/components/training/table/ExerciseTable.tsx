import _, { Dictionary } from "lodash";
import { ExerciseType, SetType } from "../../../types/TrainingTypes";
import { GoogleUser } from "../../../types/UserTypes";
import "./ExerciseTable.css"

interface ExerciseTableProps {
    rowData: Dictionary<ExerciseType[]>;
    colData: GoogleUser[];
    addRowCallback: (userId: Object) => void;
    handleRowClick: (userId: Object, setIdx: number) => void;
    handleRemoveSet: (userId: string, count: number) => void;
}

const ExerciseTable: React.FC<ExerciseTableProps> = ({ rowData: rowData, colData: colData, addRowCallback: addRowCallback, handleRowClick: handleRowClick, handleRemoveSet: handleRemoveSet }) => {
    return (
        <div className="table-container">
            {Object.entries(rowData).map(([userId, exercise]) => (
                <div key={userId} className="user-column">
                    <span className="column-header">{colData.find((user) => user._id === userId).name}</span>
                    <div key={`${userId}-sets`}>
                        {exercise[0].sets.map((set: SetType, setIdx: number) => (
                            <div key={`${userId}-${set.count}`} className="set-container">
                                <div key={`${userId}-${set.count}-row`} className="set-row" onClick={() => handleRowClick(userId, setIdx)}>
                                    <span className="set-weight">{set.weight} kg x </span>
                                    <span className="set-reps">{set.reps}</span>
                                </div>
                                <div key={`${userId}-${setIdx}-remove`} className="set-remove" onClick={() => handleRemoveSet(userId, set.count)}>
                                    X
                                </div>
                            </div>
                        ))}
                        <div key={`${userId}-add`} className="add-row" onClick={() => addRowCallback(userId)}>
                            <span className="add" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ExerciseTable;