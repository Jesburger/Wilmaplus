function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({Rest: document.querySelector("#Rest").value});
    browser.storage.local.set({Menu: document.querySelector("#Menu").value});
    console.log(e);
    console.log(document.querySelector("#Rest").value);
    console.log(document.querySelector("#Menu").value);
    alert("Saved");
}
  
  document.querySelector("form").addEventListener("submit", saveOptions);
  