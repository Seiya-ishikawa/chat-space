$(function(){

  function buildHTML(message){
    if(message.image){
    var html =
    `<div class="messages" data-message-id=${message.id}>
      <div class="messages__user-name">
       <div class="messages__user-name--name">${message.name}</div>
       <div class="messages__user-name--time">${message.date}</div>
      </div>
      <div class="messages__message">
        <p class="messages__message--content">${message.content}</p>
        <img src="${message.image}">
      </div>
     </div>`
    } else {
    var html = 
    `<div class="messages" data-message-id=${message.id}>
      <div class="messages__user-name">
        <div class="messages__user-name--name">${message.name}</div>
        <div class="messages__user-name--time">${message.date}</div>
      </div>
      <div class="messages__message">
       <p class="messages__message--content">${message.content}</p>
      </div>
     </div>`
    }
    return html
  }
  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    var last_message_id = $('.messages:last').data('message-id');
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var insertHTML = '';
      $.each(messages, function(i, message){
        insertHTML += buildHTML(message)
      });
      $('.main-message').append(insertHTML);
      $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
    })
    .fail(function(){
    });
  };
};

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
      $('.main-message').append(html);
      $('.new_message')[0].reset();
      $('.form__submit').attr('disabled', false);
      $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    })
  })
  setInterval(reloadMessages, 7000);
});