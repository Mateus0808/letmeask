import { useHistory } from 'react-router-dom'

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { ErrorModal } from '../components/ErrorModal'

export function Home() {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')
  const [closedRoomModal, setClosedRoomModal] = useState(false)

  async function handleCreateRoom () {
    if(!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom (event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      setClosedRoomModal(!closedRoomModal)
      return
    }

    if (roomRef.val().endedAt) {
      setClosedRoomModal(!closedRoomModal)
      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      { closedRoomModal && 
        <ErrorModal 
          open={closedRoomModal}
          title="Sala não encontrada"
          body="Verifique o id ou se a sala ainda não foi encerrada."
          handleSetModal={setClosedRoomModal}
        />
      }
      <aside>
        <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event?.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main> 
    </div>
  )
}