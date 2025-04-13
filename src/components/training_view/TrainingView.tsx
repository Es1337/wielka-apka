import { useState } from "react";
import Menu from "../menu/Menu";
import Table from "../table/Table";
import Modal from "../modal/Modal";

const TrainingView: React.FC = () => {
    const participants = ["111111", "22222", "33333"]
    const [showModal, setShowModal] = useState(false)
    const [exercises, setExercises] = useState([
        {name: "Leg Press", results: ["100", "80", ""]}, 
        {name: "Bench Press", results: ["150", "", "150"]},])

    function placeholder(formData: FormData) {
        let exerciseResult: string[] = []
        formData.getAll("reps").forEach((res) => exerciseResult.push(res.toString()))
        
        setExercises([...exercises, {
            name: formData.get("exercise-name").toString(),
            results: exerciseResult
        }])
    }
    
    return (
        <>
            <Menu/>
            {showModal && 
                <Modal modalAction={placeholder} onClose={() => setShowModal(false)} modalHeader="Add Exercise">
                    <input 
                        type="text"
                        name="exercise-name"
                        placeholder="Exercise Name..."
                        required
                        />
                    {participants.map((participant) => (
                        <input
                            type="text"
                            name="reps"
                            placeholder={`Reps for ${participant}...`}
                        />
                    ))}
                </Modal>}
            <h1></h1>
            <Table rowData={exercises} colData={participants} addRowCallback={() => setShowModal(true)}></Table>
        </>
    )
}

export default TrainingView;