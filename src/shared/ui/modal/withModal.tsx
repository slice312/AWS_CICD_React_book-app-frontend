import {Modal} from "@/shared/ui/modal/Modal";


interface Props {
    isOpen: boolean;
    onClose: () => void;
}


/**
 * You should wrap your modal content with HOC, for work componentWillUnmount
 * @param Component
 */
export const withModal = <T extends Props>(Component: React.ComponentType<T>) => {
    return (props: T) => {
        return (
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <Component {...props} />;
            </Modal>
        );
    };
};