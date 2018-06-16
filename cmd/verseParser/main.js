const fs = require('fs')
const nargs = require('./nargs.js')

let args = nargs.parse({
  index: [{ // index based arguments
     name: 'file',
     type: nargs.String
  }]
});

// args.file = "cmd/verseParser/resources/matthew.txt"


let file = fs.readFileSync(args.file).toString()
file = file.trim()

file = file.replace(/(\d+)\s*/gm, "$1 ")
file = file.replace(/(\d+\D+)/gm, "$1{delimiter}")

let verses = file.split("{delimiter}")
verses = verses.map(el => {
    el = el.replace(/\s*\n\s*/gm, ' ')
    el = el.replace(/"/gm, '\\"')
    el = el.trim()
    return el
})


let chapters = []
let currentVerse = -1
verses.forEach(verse => {
    if (verse){
        let verseNumber = parseInt(verse.match(/(\d+)/)[0])
        if (verseNumber != currentVerse+1){
            // verse is not apart of this chapter
            verse = verse.replace(/^\d+/, "1")
            chapters.push(verse)
            currentVerse = 1
        } else {
            let lastChapter = chapters[chapters.length-1]
            chapters[chapters.length-1] = lastChapter + " " + verse
            currentVerse = verseNumber
        }

    }
})

console.log("[")
chapters.forEach((chap, i) => {
    let comma = i < chapters.length - 1 ? ',' : ''
    console.log(`"${chap}"${comma}`)
})
console.log("]")
    

// file = file.replace(/(\n+[ \n]*\n+)|(\n+[ \n]*)|([ \n]*\n+)|(\n+)/gm, "\n")

// console.log(file)

// let chapters = []
// let verses = file.split('\n')

// let currentChapter = 1
// verses.forEach(verse => {
//     let verseNumber = verse.match(/^(\d+)/)
//     if (verseNumber == null || verseNumber.length <= 0){
//         console.log(verse)
//     } else {
//         console.log(verseNumber[0])
//     }
//     verse = verse.replace(/^(\d+)/, "$1 ") // put a space after the verse number
// })