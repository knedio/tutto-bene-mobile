export {
    bc, // background color
    p, // padding
    ph, // padding horizontal
    m, // margin
    mh, // margin horizontal
    fs, // font size
    fw, // font weight
    ta, // text align
    ffd, // flex direction
    fjc, // flex justify content
}

const bc = (backgroundColor) => { return { backgroundColor } }
const p = (padding) => { return { padding } }
const ph = (paddingHorizontal) => { return { paddingHorizontal } }
const m = (margin) => { return { margin } }
const mh = (marginHorizontal) => { return { marginHorizontal } }
const fs = (fontSize) => { return { fontSize } }
const fw = (fontWeight) => { return { fontWeight } }
const ta = (textAlign) => { return { textAlign } }
const ffd = (flexDirection) => { return { flexDirection } }
const fjc = (justifyContent) => { return { justifyContent } }