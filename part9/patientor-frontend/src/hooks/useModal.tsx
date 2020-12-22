import { useState } from "react";

type Returns = [
    boolean,
    () => void,
    () => void,
]

const useModal = (setError: React.Dispatch<React.SetStateAction<string | undefined>>): Returns => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    return [modalOpen, openModal, closeModal]
}

export default useModal