import { ReactNode, useRef, Children, useEffect, useState } from "react";
import "./Modal.css";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ExerciseSchema from "../../schemas/ExerciseSchema";
import "./DynamicModal.css";
import { GoogleUser } from "../../types/UserTypes";

interface ModalProps {
    modalAction: (formData: z.infer<ZodType>) => void;
    onClose: () => void;
    modalSchemaType: ZodType;
    modalHeader: string;
    users: GoogleUser[];
    defaultValues?: Record<string, any>;
    fieldArrayName: string;
}

const DynamicModal: React.FC<ModalProps> = ({
    modalAction,
    onClose,
    modalSchemaType,
    modalHeader,
    users,
    defaultValues,
    fieldArrayName,
}: ModalProps) => {
    const form = useForm<z.infer<typeof modalSchemaType>>({
        resolver: zodResolver(modalSchemaType),
        defaultValues: { name: "", sets: [] },
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldArrayName,
    });

    const [fieldEnabledMatrix, setFieldEnabledMatrix] = useState<boolean[][]>(
        Array.from({ length: users.length }, () =>
            Array.from({ length: fields.length }, () => false)
        )
    );

    const modalRef = useRef<HTMLDivElement>(null);
    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    function onSubmit(values: z.infer<typeof ExerciseSchema>) {
        const result = modalSchemaType.safeParse(values);
        console.log("Validation Result", result);
        console.log("Submitted Values", values);
        modalAction(values);
        onClose();
    }

    const handleFieldEnabledChange = (userIndex: number, setIndex: number) => {
        let updatedMatrix = [...fieldEnabledMatrix];
        updatedMatrix[userIndex][setIndex] = !updatedMatrix[userIndex][setIndex];
        setFieldEnabledMatrix(updatedMatrix);
    };

    return (
        <>
            <div ref={modalRef} onClick={closeModal} className="h-screen">
                <div className="modal-box">
                    <button onClick={onClose} className="close-btn">
                        X
                    </button>
                    <h1>{modalHeader}</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit, (e) => {
                            console.log("Form errors", e);
                            console.error("Form validation failed", errors);
                        })}
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Exercise Name..."
                            {...register("name")}
                        />
                        <ul className="exercise-sets">
                            {users.length > 0 &&
                                users.map((user, userIdx) => (
                                    <li key={userIdx} className="user-item">
                                        <ul className="user-sets">
                                            {fields.map((item, setIdx) => (
                                                <li key={item.id} className="field-array-item">
                                                    <div className="block">
                                                        <input
                                                            type="text"
                                                            name={`${fieldArrayName}.${userIdx}.${setIdx}.user`}
                                                            value={user._id.toString()}
                                                            {...register(
                                                                `${fieldArrayName}.${userIdx}.${setIdx}.user`
                                                            )}
                                                            hidden
                                                            readOnly
                                                        />
                                                        {fieldEnabledMatrix[userIdx][setIdx] ? (
                                                            <input
                                                                type="number"
                                                                name={`${fieldArrayName}.${userIdx}.${setIdx}.weight`}
                                                                {...register(
                                                                    `${fieldArrayName}.${userIdx}.${setIdx}.weight`
                                                                )}
                                                            />
                                                        ) : (
                                                            <>
                                                                <input
                                                                    type="number"
                                                                    name={`${fieldArrayName}.${userIdx}.${setIdx}.weight`}
                                                                    {...register(
                                                                        `${fieldArrayName}.${userIdx}.${setIdx}.weight`
                                                                    )}
                                                                    hidden
                                                                    defaultValue={0}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="add-btn"
                                                                    onClick={() =>
                                                                        handleFieldEnabledChange(userIdx, setIdx)
                                                                    }
                                                                >
                                                                    +
                                                                </button>
                                                            </>
                                                        )}
                                                        <p className="error-message">
                                                            {(errors[fieldArrayName] as any)?.[userIdx]?.[
                                                                setIdx
                                                            ]?.weight?.message ?? null}
                                                        </p>
                                                        {fieldEnabledMatrix[userIdx][setIdx] ? (
                                                            <input
                                                                type="number"
                                                                name={`${fieldArrayName}.${userIdx}.${setIdx}.reps`}
                                                                {...register(
                                                                    `${fieldArrayName}.${userIdx}.${setIdx}.reps`
                                                                )}
                                                            />
                                                        ) : (
                                                            <input
                                                                type="number"
                                                                name={`${fieldArrayName}.${userIdx}.${setIdx}.reps`}
                                                                {...register(
                                                                    `${fieldArrayName}.${userIdx}.${setIdx}.reps`
                                                                )}
                                                                hidden
                                                                defaultValue={0}
                                                            />
                                                        )}
                                                        <p className="error-message">
                                                            {(errors[fieldArrayName] as any)?.[userIdx]?.[
                                                                setIdx
                                                            ]?.reps?.message ?? null}
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="remove-btn"
                                                        onClick={() => {
                                                            remove(setIdx);
                                                            handleFieldEnabledChange(userIdx, setIdx);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                        </ul>
                        <button
                            type="button"
                            className="add-btn"
                            onClick={() =>
                                append(
                                    users.map((user, userIdx) => ({
                                        user: user._id.toString(),
                                        weight: 0,
                                        reps: 0,
                                    }))
                                )
                            }
                        >
                            Add Set
                        </button>
                        <button type="submit" className="submit-btn">
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default DynamicModal;
