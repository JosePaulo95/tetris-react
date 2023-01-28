function PlayerInput() {
  return <></>;
}
const mapStateToProps = (state) => ({
  piece: state.piece,
  board: state.board,
  limits: state.limits,
});

export default connect(mapStateToProps)(PlayerInput);
