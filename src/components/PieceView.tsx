import { motion, type Variants } from 'framer-motion'

import BlockFactory from '../factories/BlockFactory'
import styles from '../styles/blocks.module.css'
import type { Block } from '../types'

type PieceViewProps = {
  piece: Block
  section?: string
}

const initialFrom = (anim_state: string) => {
  if (anim_state === 'biggerSplash') {
    return {
      scaleX: 1.05
    }
  }
  return {}
}

const variants: Variants = {
  follow: piece => ({
    x: piece.x * (95 / 3),
    y: piece.y * (95 / 3),
    scaleX: 1,
    scaleY: 1,
    transition: {
      type: 'easeInOut',
      duration: 0.3
      // type: 'cubic-bezier(1, 0, 1, 1)',
      // stiffness: 70,
    }
  }),
  show: () => ({
    scaleX: [0, 1],
    scaleY: [0, 1]
  }),
  biggerSplash: () => ({
    // scaleY: [0.5, 1],
    scaleX: [0.95, 1.05, 0.95, 1]
    // ease: 'easeIn',
  }),
  smallerSplash: () => ({
    scaleX: [5]
  }),
  match: () => ({
    // scaleY: [1, 0],
    // opacity: [0.3, 0.3],
  }),
  static: () => ({})
}
const PieceView = ({ piece, section }: PieceViewProps) => {
  return (
    <>
      {piece && (
        <motion.table
          animate={piece.anim_state}
          className={styles.blockGroup}
          custom={piece}
          initial={initialFrom(piece.anim_state)}
          key={piece.key}
          transition={{
            duration: piece.anim_state === 'biggerSplash' ? 0.4 : 0.2
          }}
          variants={variants}
        >
          <tbody>
            {piece.initial_grid[
              piece.rotations % piece.initial_grid.length
            ].map((row, i) => (
              <tr key={i}>
                {row.map((block, j) => (
                  <BlockFactory
                    anim={piece.anim_state}
                    anim_delay={0.06 * j}
                    key={j}
                    section={section}
                    type={block}
                  ></BlockFactory>
                ))}
              </tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </>
  )
}

export default PieceView
