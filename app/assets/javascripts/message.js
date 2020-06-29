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
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});