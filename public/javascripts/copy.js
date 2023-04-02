function copyUrl() {
  const copyText = document.querySelector('#url_text').innerText
  navigator.clipboard.writeText(copyText)
  //alert
  alert('Url copied!')
}

//若使用者沒有輸入內容，就按下了送出鈕，防止表單送出並提示使用者
const shortenerButton = document.querySelector('#button-addon2')
const inputUrl = document.querySelector('#inputUrl')
shortenerButton.addEventListener('click', (event) => {
  if(!inputUrl.value.trim().length) {
    event.preventDefault()
    alert('網址不能為空')
  }
})
