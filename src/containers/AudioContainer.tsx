import { Howl } from 'howler';
import { useEffect } from 'react';
import { connect } from 'react-redux';

const audioMap = {
  side_move: 'maximize_001.ogg',
  track2: 'audio2.mp3',
  track3: 'audio3.mp3',
};

function AudioContainer({ audio, dispatch }) {
  useEffect(() => {
    const fileName = audioMap[audio.name];

    // Cria um novo objeto Howl com o arquivo de áudio especificado na propriedade `src`
    const sound = new Howl({
      src: `./resources/audio/${fileName}`,
      format: 'ogg',
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
