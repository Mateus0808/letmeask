import { useHistory, useParams } from 'react-router'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'

import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'


import '../styles/room.scss'
import { database } from '../services/firebase'
import { useState } from 'react'
import { Modal } from '../components/Modal'

type RoomParams = {
  id: string
}

export function AdminRoom () {
  const history = useHistory()
  const params = useParams<RoomParams>()
  const [modalDelete, setModalDelete] = useState(false)
  const [modalEndRoom, setModalEndRoom] = useState(false)
  const roomId = params.id
  
  const { title, questions } = useRoom(roomId)

  async function handleEndRoom () {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }

  async function handleDeleteQuestion (questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
  }

  async function handleCheckQuestionAsAnswered (questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion (questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeaks" />
          <div>
            <RoomCode code={roomId}/>
            <Button onClick={() => setModalEndRoom(!modalEndRoom)} isOutlined>Encerrar sala</Button>
            {modalEndRoom && (
              <Modal 
                open={modalEndRoom}
                title="Encerrar sala"
                body="Tem certeza que você deseja encerrar esta sala?"
                buttonText="encerrar"
                handleSetModal={setModalEndRoom}
                onClick={handleEndRoom}
              />
            )}
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question 
                content={question.content}
                author={question.author}
                key={question.id}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question?.isAnswered &&(
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question?.id)}
                    >
                      <img src={checkImg} alt="Marcar como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question?.id)}
                    >
                      <img src={answerImg} alt="Marcar pergunta como respondida" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setModalDelete(!modalDelete)}
                >
                  <img src={deleteImg} alt="Dar destaque à pergunta" />
                </button>
                {modalDelete && 
                  <Modal
                    open={modalDelete}
                    handleSetModal={setModalDelete}
                    onClick={() => handleDeleteQuestion(question.id)}
                    title="Excluir pergunta"
                    body="Tem certeza que deseja excluir esta pergunta?"
                    buttonText="excluir"
                  />
                }
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}