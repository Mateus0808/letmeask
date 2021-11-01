import emptyQuestionImg from '../../assets/images/empty-questions.svg'

import './styles.scss'

export function EmptyState () {
  return (
    <div className="empty-state">
      <img src={emptyQuestionImg} alt="Nenhuma pergunta feita" />
      <p>Nenhuma pergunta por aqui...</p>
      <span>Envie o código desta sala para seus amigos e comece a responder perguntas!</span>
    </div>
  )
}