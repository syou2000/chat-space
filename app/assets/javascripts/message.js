$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image.url) {
      var html = `
      <div class="mainchat__messagelist__message" data-message-id= ${message.id}>
        <div class="mainchat__messagelist__message__upperinfo">
          <p class="mainchat__messagelist__message__upperinfo__talker">
            ${message.user_name}
          </p> 
          <p class="mainchat__messagelist__message__upperinfo__date"> 
            ${message.created_at} 
          </p> 
        </div> 
        <div class="mainchat__messagelist__message__text"> 
          <p class="mainchat__messagelist__message__text__content"> 
            ${message.content}
          </p> 
          <img src=" ${message.image.url}" class="mainchat__messagelist__message__text__image" >
        </div>
      </div>`
    } else if (message.content) {
      var html = `
      <div class="mainchat__messagelist__message" data-message-id=  ${message.id} > 
        <div class="mainchat__messagelist__message__upperinfo"> 
          <p class="mainchat__messagelist__message__upperinfo__talker"> 
            ${message.user_name}
          </p> 
          <p class="mainchat__messagelist__message__upperinfo__date"> 
            ${message.created_at}
          </p> 
        </div> 
        <div class="mainchat__messagelist__message__text"> 
          <p class="mainchat__messagelist__message__text__content"> 
            ${message.content}
          </p> 
        </div> 
      </div>`
    } else if (message.image.url) {
      var html = `
      <div class="mainchat__messagelist__message" data-message-id=  ${message.id}  > 
        <div class="mainchat__messagelist__message__upperinfo"> 
          <p class="mainchat__messagelist__message__upperinfo__talker"> 
            ${message.user_name}
          </p> 
          <p class="mainchat__messagelist__message__upperinfo__date"> 
            ${message.created_at} 
          </p> 
        </div> 
        <div class="mainchat__messagelist__message__text"> 
          <img src="${message.image.url}" class="mainchat__messagelist__message__text__image" >
        </div> 
      </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.mainchat__messagelist').append(html);      
      $('form')[0].reset();
      $("input").prop('disabled', false);
      $('.mainchat__messagelist').animate({ scrollTop: $('.mainchat__messagelist')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました")
      });
  });
  
  var reloadMessages = function() {
    var last_message_id = $('.mainchat__messagelist__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML = buildHTML(message)
        });
        $('.mainchat__messagelist').append(insertHTML);
        $('.mainchat__messagelist').animate({ scrollTop: $('.mainchat__messagelist')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d\/messages/)) {
    setInterval(reloadMessages, 7000);
  };
});