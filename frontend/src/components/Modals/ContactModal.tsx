import { Button, Modal } from "react-bootstrap"


type TContactModal = {
    show: boolean,
    setShow: any,
    contact: any,
}

export default function ContactModal({show, setShow, contact}: TContactModal) {

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{contact?.name}</div>
                    <div>{contact?.email}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setShow(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}