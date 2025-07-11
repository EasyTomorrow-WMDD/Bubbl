// This file contains the color definitions for Bubbl as per the color palette in design.
// Usage Sample: 
/*
import BubblColors from './BubblColors';
 
export const someStyles = StyleSheet.create({
  somewhere: {
    color: BubblColors.BubblNeutralDarkest,
    backgroundColor: BubblColors.BubblWhite60,
    borderColor: BubblColors.BubblPurple500,
  },
*/

const BubblColors = {
  // Neutrals
  BubblNeutral:         '#666666',
  BubblNeutralDark:     '#444444',
  BubblNeutralDarker:   '#222222',
  BubblNeutralDarkest:  '#000000',
  BubblNeutralLight:    '#AAAAAA',
  BubblNeutralLighter:  '#CCCCCC',
  BubblNeutralLightest: '#EEEEEE',
  BubblNeutralWhite:    '#FFFFFF',
  // Opacity
  BubblNeutralDarkest5:  '#0000000D',
  BubblNeutralDarkest10: '#0000001A',
  BubblNeutralDarkest15: '#00000026',
  BubblNeutralDarkest20: '#00000033',
  BubblNeutralDarkest30: '#0000004D',
  BubblNeutralDarkest40: '#00000066',
  BubblNeutralDarkest50: '#00000080',
  BubblNeutralDarkest60: '#00000099',
  BubblTransparent:      '#FFFFFF00',
  BubblWhite5:           '#FFFFFF0D',
  BubblWhite10:          '#FFFFFF1A',
  BubblWhite15:          '#FFFFFF26',
  BubblWhite20:          '#FFFFFF33',
  BubblWhite30:          '#FFFFFF4D',
  BubblWhite40:          '#FFFFFF66',
  BubblWhite50:          '#FFFFFF80',
  BubblWhite60:          '#FFFFFF99',
  // Brand Colors - Purple
  BubblPurple50:  '#F6F4FE',
  BubblPurple100: '#EDEBFC',
  BubblPurple200: '#DFDAFA',
  BubblPurple300: '#C5BDF5',
  BubblPurple400: '#A997EE',
  BubblPurple500: '#8361E4',  // Main
  BubblPurple600: '#7B4DDA',
  BubblPurple700: '#6B3BC6',
  BubblPurple800: '#5931A6',
  BubblPurple900: '#4B2A88',
  BubblPurple950: '#2E195C',
  // Brand Colors - Orange
  BubblOrange50:  '#FFFAEB',
  BubblOrange100: '#FFF2C6',
  BubblOrange200: '#FFE388',
  BubblOrange300: '#FFCE48',  // Main
  BubblOrange400: '#FFBA20',
  BubblOrange500: '#F99707',
  BubblOrange600: '#DD7002',
  BubblOrange700: '#B74D06',
  BubblOrange800: '#943A0C',
  BubblOrange900: '#7A310D',
  BubblOrange950: '#461802',
  // Brand Colors - Pink
  BubblPink50:  '#FFF4FF',
  BubblPink100: '#FDE8FF',
  BubblPink200: '#FCD0FE',
  BubblPink300: '#FBA5FB',  // Main
  BubblPink400: '#F87AF6',
  BubblPink500: '#EE47EB',
  BubblPink600: '#D227CC',
  BubblPink700: '#AE1DA6',
  BubblPink800: '#8E1A86',
  BubblPink900: '#741B6C',
  BubblPink950: '#4D0546',
  // Brand Colors - Cyan
  BubblCyan50:  '#F0FDFB',
  BubblCyan100: '#CBFCF6',
  BubblCyan200: '#97F8EE',
  BubblCyan300: '#60EDE4',  // Main
  BubblCyan400: '#2AD7D1',
  BubblCyan500: '#11BBB8',
  BubblCyan600: '#0B9596',
  BubblCyan700: '#0D7678',
  BubblCyan800: '#105D5F',
  BubblCyan900: '#124D4F',
  BubblCyan950: '#032D30',
  // Etc., (these were samples to be removed later, but keeping just in case if anyone is using it..)
  BubblWhite: '#fff',
  BubblBlack: '#000',
  BubblePurple: '#5931A6',
  BubbleOrange: '#FFCE48',
  BubblePink: '#FBA5FB',
  BubbleGreen: '#60EDE4',
};

export const getBgClass = (moduleNumber) => {
  switch (moduleNumber) {
    case 1:
      return '#DFDAFA';
    case 2:
      return '#FFE388';
    case 3:
      return '#FCD0FE';
    default:
      return '#97F8EE';
  }
};

export const getTopicBg = (moduleNumber) => {
  switch (moduleNumber) {
    case 1:
      return '#F6F4FE';
    case 2:
      return '#FFFAEB';
    case 3:
      return '#FFF4FF';
    default:
      return '#F0FDFB';
  }
}

export const getCompleted = (moduleNumber) => {
  switch (moduleNumber) {
    case 1:
      return '#8361E4';
    case 2:
      return '#FFCE48';
    case 3:
      return '#FBA5FB';
    default:
      return '#60EDE4';
  }
}

export const textColor = (moduleNumber) => {
  switch (moduleNumber) {
    case 1:
      return '#4B2A88';
    case 2:
      return '#7A310D';
    case 3:
      return '#741B6C';
    default:
      return '#124D4F';
  }
}

export const currentTopicColor = (moduleNumber) => {
  switch(moduleNumber){
    case 1:
      return '#7B4DDA';
    case 2:
      return '#FFBA20';
    case 3:
      return '#7B4DDA';
    
    default:
      return '#0B9596';
  }
}


export default BubblColors;
