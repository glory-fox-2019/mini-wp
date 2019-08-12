$(document).ready(function(){
    manageContent()
    // $('body')
    $('#show-content').on('click',function(){
        manageContent()
    })
    $('#write-content').on('click',function(){
        writeContent()
    })
    
})