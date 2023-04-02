function copyUrl() {
  const copyText = document.querySelector('#url_text').innerText
  navigator.clipboard.writeText(copyText)
  //alert
  alert('Url copied!')
}