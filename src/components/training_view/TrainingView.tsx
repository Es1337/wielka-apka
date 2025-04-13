import Menu from "../menu/Menu";
import Table from "../table/Table";

const TrainingView: React.FC = () => {
    const exercises = [{name: "Leg Press", results: ["100", "80", ""]}, {name: "Bench Press", results: ["150", "", "150"]},]

    const participants = ["111111", "22222", "33333"]

    return (
        <>
            <Menu/>
            <div className="container">
                <Table rowData={exercises} colData={participants}></Table>
            </div>
        </>
    )
}

export default TrainingView;