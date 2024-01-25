import Block from '../components/Block'
import EmptyBlock from '../components/EmptyBlock'
import Particle from '../components/Particle'
import styles from '../styles/blocks.module.css'
interface BlockFactoryInterface {
  type: number
  section?: string
  anim?: string
  anim_delay?: number
}

const BlockFactory = (props: BlockFactoryInterface) => {
  switch (props.type) {
    case -1:
      return <EmptyBlock></EmptyBlock>
    case 0:
      return <td className={`${styles.void_block} ${styles.block}`}></td>
    case 100:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return <Particle anim={props.anim} />
    default:
      return (
        <Block
          anim={props.anim}
          anim_delay={props.anim_delay}
          section={props.section}
          type={props.type}
        />
      )
  }
}

export default BlockFactory
