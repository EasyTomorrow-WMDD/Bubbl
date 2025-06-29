// This file contains the color definitions for the Bubbl as per the color palette in design.

const BubblColors = {
  BubblExample10: '#f0f8ff', // Remove this line once the actual color is defined
  BubblWhite: '#fff',
  BubblBlack: '#000',
  BubblePurple: '#8361E4',
  BubbleOrange: '#FFCE48',
  BubblePink: '#FBA5FB',
  BubbleGreen: '#60EDE4',
  // to be defined later..
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
      return '#FCD0FE';
    default:
      return '#97F8EE';
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


export default BubblColors;
