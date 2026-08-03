import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const text =
  "Photography has always been a way for me to play visually, capture memories, and collaborate with others. Mostly medium format film. These are sets of images I'm particularly proud of."

client
  .patch('imagePage')
  .set({text})
  .commit()
  .then((res) => {
    console.log('patched', res._id, res._rev)
  })
  .catch((err) => {
    console.error('failed', err.message)
    process.exit(1)
  })
