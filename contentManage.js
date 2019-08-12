

    function manageContent(){
        let content = `<div class="col-12">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search this blog"
            id="search-article"
          />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="col-12 articles">
      </div>`
      
      let contentList = `<div class="card mb-3" style="max-width: 100%;">
      <div class="row no-gutters">
        <div
          class="col-3 photo-card"
          style="background: url(https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)"
        ></div>
        <div class="col-9">
          <div class="card-body">
            <h5 class="card-title">Content Title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a
              natural lead-in to additional content. This content is a
              little bit longer.
            </p>
            <p class="card-text">
              <small class="text-muted"
                >Last updated 3 mins ago</small
              >
            </p>
          </div>
        </div>
      </div>
    </div>`
    
    $('.main-content').empty()
    $('.main-content').append(content)
    $('.articles').ready(function(){
        for (let i=0; i<5; i++){
            $('.articles').append(contentList)
        }
    })

    }
   
function writeContent (){
    let textEditor = `<div class="col-12" style="height: 75vh">
                            <input type="text" id="title" placeholder="Title">
                            <input type="text-area" id="summernote">
                        </div>
                        <div>
                            <btn class="submit-article">Submit</btn>
                            <btn class="clear-article">Clear</btn>
                        </div>`
              
    $('.main-content').empty()
    $('.main-content').append(textEditor)
    $('#summernote').summernote({
    placeholder: 'Your Story',
    tabsize: 3,
    height: 500,
    });

}