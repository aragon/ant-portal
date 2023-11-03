import React, { ReactElement } from 'react'
import { TERMS_AND_CONDITIONS } from '../../lib/terms'

export function TermsAndConditions(): ReactElement<any, any> {
  return textToParagraphs(TERMS_AND_CONDITIONS)
}

function textToParagraphs(inputText: string): ReactElement<any, any> {
  const result: Array<ReactElement<any, any>> = []
  const paragraphs = textToParagraphList(inputText)

  // Build tree
  for (const paragraph of paragraphs) {
    result.push(
      <p>
        {paragraph.map((line, idx) => (
          <>
            {line}
            {idx === paragraph.length - 1 ? null : <br />}
          </>
        ))}
      </p>
    )
  }

  return <>{result}</>
}

function textToParagraphList(inputText: string): string[][] {
  const rawLines = inputText.replaceAll('\r', '').split('\n')
  const paragraphs: string[][] = [[]]

  // Arrange
  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim()
    if (!line) {
      if (paragraphs[paragraphs.length - 1].length === 0) {
        continue
      }
      paragraphs.push([])
      continue
    }
    paragraphs[paragraphs.length - 1].push(rawLines[i])
  }
  return paragraphs
}
