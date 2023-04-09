import { Howl } from 'howler';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

type RootState = {
  audio: {
    name: string;
  };
};

const mapStateToProps = (state: RootState): RootState => ({
  audio: state.audio,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AudioContainerProps = PropsFromRedux;

function AudioContainer({ audio }: AudioContainerProps) {
  const audioMap = new Map<string, string>([
    ['side_move', 'drop_002.ogg'],
    ['rotation_move', 'drop_001.ogg'],
    ['max_down_move', ''],
    ['piece_join', 'click_003.ogg'],
    ['combination', 'maximize_006.ogg'],
  ]);
  useEffect(() => {
    const fileName = audioMap.get(audio.name);

    const sound = new Howl({
      src: `./audio/${fileName}`,
      format: 'ogg',
      volume: 0.3,
    });

    // Toca o áudio quando o componente é montado
    sound.play();
  }, [audio]);

  return <></>;
}

export default connector(AudioContainer);
