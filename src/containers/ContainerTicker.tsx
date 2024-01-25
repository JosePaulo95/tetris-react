import { useEffect } from 'react'
import { connect, type ConnectedProps } from 'react-redux'

type RootState = {
  ticks: number
}

const mapStateToProps = (state: RootState): RootState => ({
  ticks: state.ticks
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type ContainerAudioProps = PropsFromRedux

function ContainerTicker({ ticks, dispatch }: ContainerAudioProps) {
  useEffect(() => {
    window.addEventListener('blur', () => dispatch({ type: 'ticker/pause' }))
    window.addEventListener('focus', () => dispatch({ type: 'ticker/resume' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'ticker/increment' })
    }, 50)
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticks])

  return <></>
}

export default connector(ContainerTicker)
