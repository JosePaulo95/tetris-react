type AudioState = {
  name: string;
  isPlaying: boolean;
};

const INITIAL_AUDIO_STATE: AudioState = {
  name: '',
  isPlaying: false,
};

type AudioAction = { type: 'audio/play'; payload: string } | { type: 'audio/pause' };

export default function audioReducer(
  state: AudioState = INITIAL_AUDIO_STATE,
  action: AudioAction,
): AudioState {
  switch (action.type) {
    case 'audio/play':
      return { name: action.payload, isPlaying: true };
    case 'audio/pause':
      return { ...state, isPlaying: false };
    default:
      return state;
  }
}
