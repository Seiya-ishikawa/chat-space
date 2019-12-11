$(function(){

  function buildHTML(message){
    if(message.image){
    var html = `<div class="messages">
    <div class="messages__user-name">
    <div class="messages__user-name--name">
    ${message.user}
    </div>
    <div class="messages__user-name--time">
    ${message.date}
    </div>
    </div>
    <div class="messages__message">
    <p class="messages__message--content">
    ${message.content}
    </p>
    <img src="${message.image}">

    </div>
    </div>`
    } else {
      var html = `<div class="messages">
      <div class="messages__user-name">
      <div class="messages__user-name--name">
      ${message.user}
      </div>
      <div class="messages__user-name--time">
      ${message.date}
      </div>
      </div>
      <div class="messages__message">
      <p class="messages__message--content">
      ${message.content}
      </p>
      
      </div>
      </div>`
    }
    console.log(html)
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      console.log(html)
      $('.main-message').append(html);
      $('.new_message')[0].reset();
      $('.form__submit').attr('disabled', false);
      $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージの送た");
    })
  })
});