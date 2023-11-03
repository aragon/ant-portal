const { keccak256 } = require('ethers/lib/utils')
const { readFileSync } = require('fs')
const { resolve } = require('path')

// Read the file

const fileBytes = readFileSync(
  resolve(
    __dirname,
    '..',
    'public',
    'terms',
    'redemption-terms-and-conditions.pdf'
  )
)
const fileHash = keccak256(fileBytes)
process.stdout.write(fileHash)
