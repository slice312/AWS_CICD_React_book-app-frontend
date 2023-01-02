import {useEffect, useRef, ReactNode} from "react";
import {CSSTransition} from "react-transition-group";
import cn from "classnames";

import {ReactPortal} from "./ReactPortal";
import css from "./styles.module.scss";


interface Props {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = ({children, isOpen, onClose}: Props) => {
    const nodeRef = useRef(null);

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if (e.key === "Escape")
                onClose();
        };
        document.body.addEventListener("keydown", closeOnEscapeKey);

        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
            document.body.style.overflow = "auto";
        };

    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto"; // disable scrolling
    }, [isOpen]);

    return (
        <ReactPortal wrapperId="modal-root">
            <CSSTransition
                nodeRef={nodeRef}
                in={isOpen}
                timeout={{enter: 0, exit: 300}}
                mountOnEnter
                unmountOnExit
                classNames={{
                    enterDone: css.modalOpen,
                    exitDone: css.modalExit
                }}
            >
                <div className={cn(css.modal)} tabIndex={0} ref={nodeRef}>
                    <div className={css.content}>
                        {children}
                    </div>
                </div>
            </CSSTransition>
        </ReactPortal>
    );
};