function onSignIn(googleUser) {
    const idToken= googleUser.getAuthResponse().id_token
    $.ajax({
        url: `http://35.232.133.45/users/glogin`,
        type: 'POST',
        data: {
           idToken
        }
    })
    .done(function(data){
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.userId)
    })
    .fail(function(err){
        console.log(err)
    })
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    }); 
    localStorage.removeItem("token")
    localStorage.removeItem("userId")

}