import Table from "../table/Table";

const TrainingView: React.FC = () => {
    const training = [
        { participants: [
            {name: "Participant 1", exercises: [ {name: "Leg Press", score: "100"}, {name: "Bench Press", score: "50"}]},
            {name: "Participant 2", exercises: [ {name: "Leg Press", score: "150"}]}
        ]}
    ]

    const exercises = [
        "Leg Press",
        "Bench Press"
    ]
    
    return (
        <>
            <div className="container">
                <Table></Table>
            </div>
        </>
    )
}

export default TrainingView;