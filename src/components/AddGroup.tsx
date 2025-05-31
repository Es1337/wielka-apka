import React, { Dispatch, SetStateAction, useState } from "react";
import "./AddGroup.css";
import Modal from "./modal/Modal";
import { GroupType } from "../types/GroupTypes";
import { AxiosResponse } from "axios";
import API from "../api";

type AddGroupProps = {
    groupStateHandler: Dispatch<SetStateAction<GroupType[]>>;
};

const AddGroup: React.FC<AddGroupProps> = ({groupStateHandler}) => {
    const [showModal, setShowModal] = useState(false);

    async function addGroupAPI(newGroupName: string): Promise<GroupType | undefined> {
            let group: AxiosResponse;
            try {
                group = await API.post("/group", {
                    groupName: newGroupName
                }, {withCredentials: true});
                let payload: GroupType = group.data;
                console.log(payload);
                return payload;
            } catch (e) {
                console.error('Failure adding group');
                return;
            }
        }

    const addGroup = (formData: FormData): void => {
        addGroupAPI(formData.get("group-name").toString()).then((group) => {
            groupStateHandler((prevGroups,) => ([
                ...prevGroups,
                {
                    _id: group._id,
                    groupName: group.groupName,
                    date: group.date,
                    users: group.users,
                },
            ]));
            setShowModal(false);
        });
    };

    return (
        <>
            {showModal ? (
                <Modal
                    modalAction={addGroup}
                    onClose={() => setShowModal(false)}
                    modalHeader="Create Group"
                >
                    <input
                        type="text"
                        name="group-name"
                        placeholder="Enter Name..."
                        required
                    />
                </Modal>
            ) : null}
            <div className="group-card" onClick={() => setShowModal(true)}>
                <span className="add-group" />
            </div>
        </>
    );
};

export default AddGroup;
