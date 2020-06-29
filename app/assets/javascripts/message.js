$(function(){

  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="message" data-message-id=${message.id}>
        <div class="message__upper-info">
          <p class="message__upper-info__name">
            ${message.user_nickname}
          </p>
          <p class="message__upper-info__created-at">
            ${message.created_at}
          </p>
        </div>
        <div class="message__text">
          <p class="lower-message__content">
            ${message.text}
          </p>
        </div>
        <img src=${message.image} >
      </div>`
      return html;
    } else {
      let html =
      `<div class="message" data-message-id=${message.id}>
        <div class="message__upper-info">
          <p class="message__upper-info__name">
            ${message.user_nickname}
          </p>
          <p class="message__upper-info__created-at">
            ${message.created_at}
          </p>
        </div>
        <div class="message__text">
          <p class="lower-message__content">
            ${message.text}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        let html = buildHTML(data);
        $('.main-chat__message-list').append(html);
        $('form')[0].reset();
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
        $('.submit-btn').prop('disabled', false);
      })
      .fail(function(){
        alert('メッセージの送信に失敗しました');
        $('.submit-btn').prop('disabled', false);
      })
  });
});
  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
