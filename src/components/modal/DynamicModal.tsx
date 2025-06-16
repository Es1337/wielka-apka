import { ReactNode, useRef, Children, useEffect, useState } from "react";
import "./Modal.css"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ExerciseSchema from "../../schemas/ExerciseSchema";
import './DynamicModal.css';

interface ModalProps {
    modalAction: (formData: z.infer<ZodType>) => void;
    onClose: () => void;
    modalSchemaType: ZodType
    modalHeader: string;
    users: string[];
    defaultValues?: Record<string, any>;
    fieldArrayName: string;
}

const DynamicModal: React.FC<ModalProps> = (
    { modalAction, onClose, modalSchemaType, modalHeader,
        users, defaultValues, fieldArrayName }: ModalProps) => {

    const form = useForm<z.infer<typeof modalSchemaType>>({
        resolver: zodResolver(modalSchemaType),
        defaultValues: modalSchemaType.parse(defaultValues) || modalSchemaType.parse({}),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldArrayName,
    });

    const [fieldEnabledMatrix, setFieldEnabledMatrix] = useState<boolean[][]>(
        Array.from({length: users.length}, 
            () => Array.from({length: fields.length}, 
                () => false)));

    const modalRef = useRef<HTMLDivElement>(null);
    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    function onSubmit(values: z.infer<typeof ExerciseSchema>) {
        modalAction(values);
        onClose();
    }

    const handleFieldEnabledChange = (userIndex: number, setIndex: number) => {
        let updatedMatrix = [...fieldEnabledMatrix];
        updatedMatrix[userIndex][setIndex] = !updatedMatrix[userIndex][setIndex];
        setFieldEnabledMatrix(updatedMatrix);
    }

    return (
        <>
            <div ref={modalRef} onClick={closeModal} className="h-screen">
                <div className="modal-box">
                    <button onClick={onClose} className="close-btn">X</button>
                    <h1>{modalHeader}</h1>
                    <form onSubmit={handleSubmit(onSubmit, () => {
                        console.error("Form validation failed", errors);
                    })}>
                        <Controller
                            name={`name`}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Exercise Name..."
                                    {...field}
                                />
                            )}
                            control={control}
                        />
                        <ul className="exercise-sets">
                            {users.length > 0 &&
                                users.map((user, userIndex) => (
                                    <li key={userIndex} className="user-item">
                                        <ul className="user-sets">
                                            {fields.map((item, setIndex) => (
                                                    <li key={item.id} className="field-array-item">
                                                        <div className="block">
                                                            <Controller
                                                                name={`${fieldArrayName}.${setIndex}.weight`}
                                                                render={({ field }) => fieldEnabledMatrix[userIndex][setIndex] ? (
                                                                    <input
                                                                        type="number"
                                                                        name="weight"
                                                                        {...field}
                                                                    />
                                                                ) : <button
                                                                    type="button"
                                                                    className="add-btn"
                                                                    onClick={() => handleFieldEnabledChange(userIndex, setIndex)}>
                                                                    +
                                                                </button>}
                                                                control={control} />
                                                            <p className="error-message">
                                                                {(errors[fieldArrayName] as any)?.[setIndex]?.weight?.message ?? null}
                                                            </p>
                                                            <Controller
                                                                name={`${fieldArrayName}.${setIndex}.reps`}
                                                                render={({ field }) => fieldEnabledMatrix[userIndex][setIndex] ? (
                                                                    <input
                                                                        type="number"
                                                                        name="reps"
                                                                        {...field}
                                                                    />
                                                                ) : null}
                                                                control={control} />
                                                            <p className="error-message">
                                                                {(errors[fieldArrayName] as any)?.[setIndex]?.reps?.message ?? null}
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="remove-btn"
                                                            onClick={() => {remove(setIndex); handleFieldEnabledChange(userIndex, setIndex)}}
                                                        >Delete</button>
                                                    </li>
                                                ))}
                                        </ul>
                                    </li>
                                ))}
                        </ul>
                        <button
                            type="button"
                            className="add-btn"
                            onClick={() => append({ weight: 0, user: [], reps: 0 })}>
                            Add Set
                        </button>
                        <button type="submit" className="submit-btn">Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DynamicModal;