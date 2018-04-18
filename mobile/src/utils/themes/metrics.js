const makeCircle = size => ({
  height: size,
  width: size,
  borderRadius: size / 2,
});

const makeHitSlop = size => ({
  left: size,
  right: size,
  top: size,
  bottom: size,
});

const centerElement = {
  justifyContent: 'center',
  alignItems: 'center',
};

export { makeCircle, makeHitSlop, centerElement };
