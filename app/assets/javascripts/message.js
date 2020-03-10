$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
     `<div class="mainchat__messagelist__message">
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
     return html;

   } 
   else {
     var html =
     `<div class="mainchat__messagelist__message">
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
     return html;
   };
 }
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
    alert("メッセージ送信に失敗しました");
});
})
});