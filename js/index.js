$(document).ready(function(){
  $('.grid').masonry({
    // options
    itemSelector: '.grid-item'
  });
  let quill = new Quill('.editor--content__wysiwyg', {
    theme: 'snow'
  });
  $('#form--post').submit(function(e){
    e.preventDefault();
  })
  $('.editor--tag__input__form input').keyup(function(e){
    e.preventDefault()
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      addTag('.editor--tag__item--list',$(this).val());
      $(this).val('');
    }
  });
});

function clickMenu(elTo, elThis){
  $('.main-content').hide();
  $('#'+elTo).show();
  $('.active').removeClass('active');
  $(elThis).addClass('active');
}

function addTag(el, val){
  let html = `
  <div class="editor--tag__item">${val} <a onclick="removeTag(this)">&times;</a></div>
  `
  $(el).append(html);
}
function removeTag(el){

}