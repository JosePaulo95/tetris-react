import { motion, Variants } from 'framer-motion';

import blockStyles from '../styles/blocks.module.css';
import particleStyles from '../styles/particles.module.css';

const variants: Variants = {
  match: () => ({
    y: [0, -10],
    scale: [0, 1.5],
    opacity: [0.7, 0],
  }),
};

const Particle = ({ anim }: { anim?: string }) => {
  return (
    <motion.td
      animate={'match'}
      variants={variants}
      className={`${particleStyles.particle_block} ${blockStyles.block}`}
    >
      <div className={`${particleStyles.bolinha} ${particleStyles.bolinha_top}`}>
        &#9733;
      </div>
      <div className={`${particleStyles.bolinha} ${particleStyles.bolinha_bottom_left}`}>
        &#9733;
      </div>
      <div className={`${particleStyles.bolinha} ${particleStyles.bolinha_bottom_right}`}>
        &#9733;
      </div>
    </motion.td>
  );
};

export default Particle;
