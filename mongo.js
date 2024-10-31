const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://luisgut11jm:${password}@cluster0.l0eq8.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)


const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: process.argv[3],
  important: process.argv[4],
})

if(process.argv.length>3){  
  note.save().then(result => {
    console.log(`note saved!`)
    mongoose.connection.close()
  })
} else{
  Note.find({}).then(result => {
    console.log("notes:")
    result.forEach(note => {
      console.log(note.content)
    })
    mongoose.connection.close()
  })
}

