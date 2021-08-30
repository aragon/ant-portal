import React from 'react'
import styled from 'styled-components'

const CircleContainer = styled.div`
  height: 24px;
  margin: 10px 0px 0px 21px;
  width: 24px;
`

const Circle = styled.div`
  width: 16px;
  height: 16px;
  color: white;
  float: left;
  background: #3e7bf6;
  border-radius: 50%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);

  // slightly elevates the questionmark on hover.
  ${CircleContainer}:hover & {
    transition: all 0.2s ease-out;
    transform: translateY(-1px);
  }
`

const QuestionMark = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-left: 4.25px;
  margin-top: -2px;
  user-select: none; 
  -webkit-touch-callout : none
  -webkit-user-select:none
`

const TooltipBalloon = styled.div`
  position: relative;
  width: 280px;
  margin-bottom: 0px;
  margin-left: 40px;
  padding: 14px 16px;
  background-color: #cad9f9ee;
  border: #3e7bf6 solid;
  border-radius: 10px;
  color: #3e7bf6;
  font-size: 16px;
  text-align: left;
  visibility: hidden;
  z-index: 1;
  right: 340px;
  ${CircleContainer}:hover & {
    visibility: visible;
  }
`

export const Tooltip = ({ hoverText }: { hoverText: string }): JSX.Element => {
  return (
    <CircleContainer>
      <Circle>
        <QuestionMark>?</QuestionMark>
      </Circle>
      <TooltipBalloon>{hoverText}</TooltipBalloon>
    </CircleContainer>
  )
}

export default Tooltip
