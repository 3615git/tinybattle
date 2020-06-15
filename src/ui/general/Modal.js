import React from 'react'
import { connect } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import ModalAbout from './ModalAbout'
import ModalSettings from './ModalSettings'
import ModalReset from './ModalReset'
import ModalHelp from './ModalHelp'

import '../../css/modal.scss'
import closeIcon from '../../pics/ui/close.svg'

/**
  * @desc Basic modal window
*/

const mapStateToProps = state => {
  return {
    data: state
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const modalContent = (content) => {
  switch (content) {
    case `about`:
      return <ModalAbout key="modalAbout" />
    case `help`:
      return <ModalHelp key="modalHelp" />
    case `settings`:
      return <ModalSettings key="modalSettings" />
    case `reset`:
      return <ModalReset key="modalReset" />
    default:
      break;
  }
}

const Modal = ({ content, close, display }) => {

  const handleChildClick = function(e) {
    e.stopPropagation();
  }

  // Display component
  if (display) return [
    <TransitionGroup component={null}>
      <CSSTransition
        timeout={300}
        classNames={"fade"}
        appear
        leave
      >
        <div key="modalWrapper" className="modalWrapper" onClick={close}>
          <div key="modal" className="modal" onClick={handleChildClick}>
            <button key="closeModal" id="closeModal" className="option" onClick={close}><img src={closeIcon} alt="Close" /></button>
            {modalContent(content)}
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  ]
  else return null
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(Modal)
