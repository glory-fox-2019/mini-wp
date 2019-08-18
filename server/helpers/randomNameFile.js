function randomNameFile(originalName) {
  const kamus = 'abcdhashdhjasdhjasd32434aklasdkl67347'
  let newFileName = ''
  for(let i=0;i<20;i++){
    newFileName += kamus[Math.round(Math.random()*30)]
  }

  for(let i=0;i<originalName.length;i++) {
    if(originalName[i] === ' ') {

    }else{
      newFileName += originalName[i]
    }
  }
  return newFileName
}

module.exports = randomNameFile