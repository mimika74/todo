<template>
  <div>
    <div class='container'>
      <form>
        <table>
          <tr class='item'>
            <th class='label'>お問合せ内容</th>
            <td>
              <input name="fav_sports" list="sports_list" class='input-item'>
              <datalist id="sports_list">
                <option value="開発・制作に関するお問合せ" />
                <option value="見積もりのご依頼" />
                <option value="製品・サービスに関するお問合せ" />
                <option value="採用に関するお問合せ" />
                <option value="その他" />
              </datalist>
            </td>
          </tr>
          <tr class='item'>
            <th class='label'>会社名</th>
            <td>
              <input class='input-item'/>
            </td>
          </tr>
          <tr class='item'>
            <th class='label'>お名前</th>
            <td><input class='input-item'/></td>
          </tr>
          <tr class='item'>
            <th class='label'>電話番号</th>
            <td><input class='input-item' /></td>
          </tr>
          <tr class='item'>
            <th class='label'>Email</th>
            <td><input v-model='email' class='input-item' required/>
              <span v-if='nonemail'>入力お願いします！</span>
            </td>
          </tr>
          <tr class='item'>
            <th></th>
            <td>
              <button type='submit' @click='checkForm' :disabled='activate'>送信！</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
}

.container {
  font-family: 'M PLUS 1p', sans-serif;
  background: #cfdc28;
  color: white;
  text-align: center;
  justify-content: left;
  position: relative;
  display: flex;
  margin-top: 50px;
}

.item {
  justify-content: center;
}

.label {
  width: 100px;
  text-align: left;
  vertical-align: top;
}

.input-item {
  border: none;
  border-bottom: 1px solid #fff;
  background: #cfdc28;
  outline: none;
  color: white;
  margin-bottom: 20px;
  width: 300px;
}


button {
  border: none;
  outline: none;
  background: #cfdc28;
  color: white;
  cursor: pointer;
}

</style>
