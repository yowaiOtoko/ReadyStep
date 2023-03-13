import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { Btn } from "../../../../AbstractElements"

const DeleteModal = ({isOpen, toggler, onDelete}) => {

    return (
        <Modal isOpen={isOpen} toggle={() => toggler()} centered>
          <ModalHeader toggle={toggler}>
            delete
          </ModalHeader>
          <ModalBody >
           Confirmez la suppression
          </ModalBody>
          <ModalFooter>
            <Btn attrBtn={{ color: 'secondary', onClick: toggler }} >Annuler</Btn>
            <Btn attrBtn={{ color: 'danger', onClick: onDelete }}>Supprimer</Btn>
          </ModalFooter>
        </Modal>
      )
}

export default DeleteModal