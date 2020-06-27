$(function(){
  function addUser(user) {
    let html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.nickname}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.nickname}">追加</div>
    </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  
  function addDeleteUser(nickname, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${nickname}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${nickname}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
