import { ReactNode, useRef, Children, useEffect } from "react";
import "./Modal.css"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ExerciseSchema from "../../schemas/ExerciseSchema";
import './DynamicModal.css';
import { on } from "events";

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
        formState: { errors, dirtyFields },
    } = form;

    // Create dynamic forms
    type FieldArrayItem = { id: string; weight: number; reps: number; user: string[] };

    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldArrayName,
    });

    const modalRef = useRef<HTMLDivElement>(null);
    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    function onSubmit(values: z.infer<typeof ExerciseSchema>) {
        // console.log(values);
        // let form_data = new FormData();

        // const get = <T, K extends keyof T>(obj: T, key: K) => obj[key]

        // for (var key in values) {
        //     console.log("Key", key);
        //     const value = get(values, key as keyof typeof values);
        //     console.log("Value", value);
        //     form_data.append(key, typeof value === "object" ? JSON.stringify(value) : String(value));
        // }

        // for (var key of form_data.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
        modalAction(values);
        onClose();
    }

    const value = useWatch({
        control,
        name: fieldArrayName,
    });

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
                                users.map((user, index) => (
                                    <li key={index} className="user-item">
                                        <ul className="user-sets">
                                            {fields.map((item, index) => (
                                                    <li key={item.id} className="field-array-item">
                                                        <div className="block">
                                                            <Controller
                                                                name={`${fieldArrayName}.${index}.weight`}
                                                                render={({ field }) => value?.[index]?.reps > 0 || value?.[index]?.weight > 0 ? (
                                                                    <input
                                                                        type="number"
                                                                        name="weight"
                                                                        {...field}
                                                                    />
                                                                ) : <button
                                                                    type="button"
                                                                    className="add-btn"
                                                                    onClick={() => append({ weight: 0, user: [], reps: 0 })}>
                                                                    Add Set
                                                                </button>}
                                                                control={control} />
                                                            <p className="error-message">
                                                                {(errors[fieldArrayName] as any)?.[index]?.weight?.message ?? null}
                                                            </p>
                                                            <Controller
                                                                name={`${fieldArrayName}.${index}.reps`}
                                                                render={({ field }) => value?.[index]?.reps > 0 || value?.[index]?.weight > 0 ? (
                                                                    <input
                                                                        type="number"
                                                                        name="reps"
                                                                        {...field}
                                                                    />
                                                                ) : null}
                                                                control={control} />
                                                            <p className="error-message">
                                                                {(errors[fieldArrayName] as any)?.[index]?.reps?.message ?? null}
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="remove-btn"
                                                            onClick={() => remove(index)}
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