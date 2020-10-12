import React, {useState} from 'react'
import Modal from 'react-modal'
import {useVerbDrillPersistedState, Tense} from '../hooks/useVerbQuestion'

const NUMBER_OF_TENSES = Object.values(Tense).length

// react-modal needs its own base element outside #root
Modal.setAppElement('#verb-drill-settings-modal')

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
  const [disabledTenses, setDisabledTenses] = useVerbDrillPersistedState<string[]>([])

  const tenseIsActive = (tense: Tense) => {
    if (Array.isArray(disabledTenses) && disabledTenses.includes(tense)) {
      return false
    }

    return true
  }

  const toggleTenseDisabledState = (tense: Tense) => {
    if (tenseIsActive(tense)) {
      if (disabledTenses.length + 1 === NUMBER_OF_TENSES) {
        alert('Interdit - il faut au moins un temps')
        return
      }

      setDisabledTenses([tense, ...disabledTenses])
    } else {
      setDisabledTenses(disabledTenses.filter((t) => t !== tense))
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Paramétres" style={customStyles}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Temps / modes proposés</h4>
        </div>
        <div className="modal-body">
          {Object.values(Tense).map((tense) => {
            return (
              <div className="checkbox" key={tense}>
                <label>
                  <input
                    type="checkbox"
                    checked={tenseIsActive(tense)}
                    onChange={() => toggleTenseDisabledState(tense)}
                  />{' '}
                  {tense}
                </label>
              </div>
            )
          })}
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
  const [showSettingsModal, setShowSettingsModal] = useState(false)

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
