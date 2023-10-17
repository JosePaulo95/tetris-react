import { connect, type ConnectedProps } from 'react-redux'

import ScoreContainer from '../components/ScoreContainer'
import styles from '../styles/score.module.css'

type RootState = {
  score: number
}

const mapStateToProps = (state: RootState): RootState => ({
  score: state.score
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type ContainerAudioProps = PropsFromRedux

function ContainerScore({ score }: ContainerAudioProps) {
  return (
    <ScoreContainer>
      <div className={styles.highScore}>
        <span className={styles.scoreValue}>{7500}</span>
        <img alt="" src="./icons/crown-icon.svg" />
      </div>
      <span className={styles.scoreValue}>{score}</span>
    </ScoreContainer>
  )
}

export default connector(ContainerScore)
