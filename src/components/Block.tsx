import { motion, type Variants } from 'framer-motion'

import styles from '../styles/blocks.module.css'

const mapClass = (type: number) => {
  switch (type) {
    case 1:
      return styles.block_a
    case 2:
      return styles.block_b
    case 3:
      return styles.block_c
    case 4:
      return styles.block_d
    case 5:
      return styles.block_T
    default:
      return styles.block_white
  }
}

const variants: Variants = {
  match: () => ({
    y: [0, 30],
    scale: [1.2, 0],
    rotateZ: [0, -45],
    borderRadius: [0, 100]
    // scaleX: [1.1, 3],
  })
}

const Block = ({
  type,
  section,
  anim,
  anim_delay
}: {
  type: number
  section?: string
  anim?: string
  anim_delay?: number
}) => {
  return (
    <motion.td
      animate={anim}
      className={`${mapClass(type)} ${styles.block}`}
      style={{
        transformOrigin: 'bottom' // Define o pivô para o canto superior esquerdo
      }}
      transition={{
        duration: 0.2, // Defina a duração da animação em segundos
        ease: 'easeOut', // Escolha o tipo de curva de animação desejada
        delay: anim_delay
      }}
      variants={variants}
    >
      {(section === 'front' || !section) && (
        <div className={styles.front}></div>
      )}
      {(section === 'sides' || !section) && <div className={styles.side}></div>}
    </motion.td>
  )
}

export default Block
