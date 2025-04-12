import "./Table.css"
import { GoPencil } from "react-icons/go"

const Table: React.FC = () => {
    const exercises = [{name: "Leg Press", results: ["100", "80", ""]}, {name: "Bench Press", results: ["150", "", "150"]},]

    const participants = ["111111", "22222", "33333"]

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        {participants.map((participant) => <th>{participant}</th>)}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise) => 
                        <tr>
                            <td>
                                {exercise.name}
                            </td>
                            {exercise.results.map((res) => <td>{res}</td>)}
                            <td><span className="actions"><GoPencil/></span></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table;