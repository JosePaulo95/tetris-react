import { Howl } from 'howler';
import { useEffect } from 'react';
import { connect } from 'react-redux';

const audioMap = {
  side_move: 'drop_002.ogg',
  rotation_move: 'drop_001.ogg',
  max_down_move: '',
  piece_join: 'click_003.ogg',
  combination: 'maximize_006.ogg',
};

function AudioContainer({ audio, dispatch }) {
  useEffect(() => {
    const fileName = audioMap[audio.name];

    // Cria um novo objeto Howl com o arquivo de áudio especificado na propriedade `src`
    const sound = new Howl({
      src: `./resources/audio/${fileName}`,
      format: 'ogg',
      volume: 0.3,
    });

    // Toca o áudio quando o componente é montado
    sound.play();

    // Retorna uma função para parar o áudio quando o componente é desmontado
    //return () => sound.stop();
  }, [audio]);

  return <></>;
}

const mapStateToProps = (state) => ({
  audio: state.audio,
});

export default connect(mapStateToProps)(AudioContainer);
