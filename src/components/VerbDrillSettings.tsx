import React, {useState} from 'react'
import createPersistedState from 'use-persisted-state'
import Modal from 'react-modal'

// react-modal needs its own base element outside #root
Modal.setAppElement('#verb-drill-settings-modal')

// Save and share settings across tabs / reloads
const useVerbDrillState = createPersistedState('verbDrills')

// Just the cog icon
const VerbDrillCogButton = ({openModal}: {openModal: () => void}) => {
  return (
    <button type="button" className="btn-stripped btn-lg" aria-label="Paramètres" onClick={openModal}>
      <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
    </button>
  )
}

// The modal / form
type SettingsModalProps = {
  isOpen: boolean
  closeModal: () => void
}

// Override modal styles. unset all the things
const customStyles = {
  content: {
    overflow: undefined,
    borderRadius: undefined,
    border: undefined,
    background: undefined,
    position: undefined,
    padding: undefined,
    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined,
  },
}

const VerbDrillSettingsModal = ({isOpen, closeModal}: SettingsModalProps) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Paramétres" style={customStyles}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Temps / modes proposés</h4>
        </div>
        <div className="modal-body">
          <div className="checkbox">
            <label>
              <input type="checkbox" /> Check me out
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}

// Top-level logic
const VerbDrillSettings = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(true)

  const openModal = () => setShowSettingsModal(true)
  const closeModal = () => setShowSettingsModal(false)

  return (
    <>
      <VerbDrillCogButton openModal={openModal} />
      <VerbDrillSettingsModal isOpen={showSettingsModal} closeModal={closeModal} />
    </>
  )
}

export default VerbDrillSettings
