import { createContext, FC, useState, ReactNode, useContext } from 'react'
import { EuiModal, EuiModalBody, EuiModalFooter, EuiButton } from '@elastic/eui'

type ModalContextActions = {
  showModal: (content: ReactNode, showFooter?: boolean) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextActions>({} as ModalContextActions)

interface ModalContextProviderProps {
  children: ReactNode
}

const ModalProvider: FC<ModalContextProviderProps> = ({ children }) => {
  const [content, setContent] = useState<ReactNode>(undefined)
  const [showFooter, setShowFooter] = useState(true)

  const closeModal = () => setContent(null)
  const showModal = (content: ReactNode, showFooter?: boolean): void => {
    if (showFooter === undefined) setShowFooter(true)
    else setShowFooter(showFooter)
    setContent(content)
  }

  let modal
  if (content) {
    modal = (
      <EuiModal onClose={closeModal} style={{ padding: '1em', minWidth: '800px' }} role='dialog'>
        <EuiModalBody>{content}</EuiModalBody>
        {showFooter && (
          <EuiModalFooter>
            <EuiButton onClick={closeModal} size='s' color='text'>
              Fermer
            </EuiButton>
          </EuiModalFooter>
        )}
      </EuiModal>
    )
  }

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {modal}
    </ModalContext.Provider>
  )
}

const useModal = (): ModalContextActions => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within a ModalContextProvider')
  }

  return context
}

export { ModalProvider, useModal }
