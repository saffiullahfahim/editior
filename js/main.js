let editor = "";

let unlock = false;
  
let path = "/sdcard";
  // All Directory & File list show
  
  window.onload = function(){
   // document.getElementById('editor-container').style.height = (window.innerHeight-93) +'px'; 
  	init();
  }
  
  function init(){
  /*document.getElementById('editor-container').style.height = (window.innerHeight-93) +'px'
  window.onresize = function(){
  document.getElementById('editor-container').style.height = (window.innerHeight-93) +'px'
  }*/
    var form = new FormData();
    form.append("path", path);
    var url = "/editor/php/path.php";
    fetch(url,{
      method: "POST",
      mode: "no-cors",
      header:{
      'Content-Type': 'application/json'
      },
      body:  form
    })
    .then(res => res.text())
    .then(text => {
    data = JSON.parse(text);
    
    //add Folder & add File Button
    {
    let div = document.createElement('div');
    div.setAttribute('class', 'menu-item');
    div.setAttribute('ondblclick', "let div = document.getElementById(this.getAttribute('path')); if(div.innerText=='Add New Folder'){div.innerText=''}; div.setAttribute('contenteditable', ''); div.focus()");
    div.setAttribute('path', "folder"+path );
    let item = document.createElement('div');
    item.setAttribute('class', 'item');
    let img = document.createElement('img');
    img.src = "icons/add-folder.svg";
    let nam = document.createElement('div');
    nam.setAttribute('class', 'name');
    nam.setAttribute('id', 'folder'+path);
    nam.setAttribute('path', path);
    nam.setAttribute('onblur', 'if(this.innerText==""){this.innerText="Add New Folder"; this.removeAttribute("contenteditable");}');
    nam.setAttribute('oninput', "if(this.innerText.match('\\n')){if(this.innerHTML=='<div><br></div><div><br></div>'){this.innerText=''; this.blur();}else{addNewMain(this,this.innerText.substr(0, this.innerText.search('\\n')), 'folder');}}");
    nam.setAttribute('style', 'width:100%;outline:none;color:#555;');
    nam.innerText="Add New Folder" //data.folder[i].replace(path+'/','')
    item.appendChild(img);
    item.appendChild(nam);
    div.appendChild(item);
    menu.appendChild(div);
    }
    
    {
    let div = document.createElement('div');
    div.setAttribute('class', 'menu-item');
    div.setAttribute('ondblclick', "let div = document.getElementById(this.getAttribute('path')); if(div.innerText=='Add New File'){div.innerText=''}; div.setAttribute('contenteditable', ''); div.focus()");
    div.setAttribute('path', "file"+path );
    let item = document.createElement('div');
    item.setAttribute('class', 'item');
    let img = document.createElement('img');
    img.src = "icons/add-file.svg";
    let nam = document.createElement('div');
    nam.setAttribute('class', 'name');
    nam.setAttribute('id', "file"+path);
    nam.setAttribute('path', path);
    nam.setAttribute('onblur', 'if(this.innerText==""){this.innerText="Add New File"; this.removeAttribute("contenteditable");}');
    nam.setAttribute('oninput', "if(this.innerText.match('\\n')){if(this.innerHTML=='<div><br></div><div><br></div>'){this.innerText=''; this.blur();}else{addNewMain(this,this.innerText.substr(0, this.innerText.search('\\n')), 'file');}}");
    nam.setAttribute('style', 'width:100%;outline:none;color:#555;');
    nam.innerText="Add New File" //data.folder[i].replace(path+'/','')
    item.appendChild(img);
    item.appendChild(nam);
    div.appendChild(item);
    menu.appendChild(div);
    }
    
    // Folder List
    if(data.folder.length>0){
    for(let i=0; i<data.folder.length; i++){
    let div = document.createElement('div');
    div.setAttribute('class', 'menu-item');
    div.setAttribute('ondblclick', "openDir('"+data.folder[i]+"');this.removeAttribute('ondblclick');");
    div.setAttribute('id', data.folder[i] );
    let item = document.createElement('div');
    item.setAttribute('class', 'item');
    let img = document.createElement('img');
    img.src = "icons/file-directory.svg";
    let nam = document.createElement('div');
    nam.setAttribute('class', 'name');
    nam.innerText = data.folder[i].replace(path+'/','')
    item.appendChild(img);
    item.appendChild(nam);
    div.appendChild(item);
    if(data.folder[i].replace(path+'/','')!="editor"){
    menu.appendChild(div);
    }
    }
    }
    
    // File List
    if(data.file.length>0){
    for(let i=0; i<data.file.length; i++){
    let div = document.createElement('div');
    div.setAttribute('class', 'menu-item');
    div.setAttribute('path', data.file[i]);
    let item = document.createElement('div');
    item.setAttribute('class', 'item');
    let img = document.createElement('img');
    img.src = "icons/file-text.svg";
    let nam = document.createElement('div');
    nam.setAttribute('class', 'name');
    nam.innerText = data.file[i].replace(path+'/','')
    item.appendChild(img);
    item.appendChild(nam);
    div.appendChild(item);
    
    
    let file3 = data.file[i].replace(path+'/','').substr(-3);
    let file4 = data.file[i].replace(path+'/','').substr(-4);
    
    
    // TEXT or README file open as text
    if(file3=='txt' || data.file[i].replace(path+'/','').toLowerCase()=='readme'){
    img.src = "icons/file-text.svg";
    div.setAttribute('ondblclick', "openFile(this, 'txt')");
    menu.appendChild(div);
    }
    
    // PHP file open as text
    if(file3=='php'){
    img.src = "icons/php.svg";
    div.setAttribute('ondblclick', "openFile(this, 'php')");
    menu.appendChild(div);
    }
    
    /*
    // SVG file open as text
    if(file3=='svg'){
    img.src = "icons/svg.svg";
    div.setAttribute('ondblclick', "openFile(this, 'txt')");
    menu.appendChild(div);
    }
    
    // XML file open as text
    if(file3=='xml'){
    img.src = "icons/xml.svg";
    div.setAttribute('ondblclick', "openFile(this, 'txt')");
    menu.appendChild(div);
    }*/
    
    // PDF file Open
    if(file3=='pdf'){
    img.src = "icons/file-pdf.svg";
    div.setAttribute('ondblclick', "openFile(this, 'pdf')");
    menu.appendChild(div);
    }
    
    // Media File Open
    if(file3=='png' || file3=="jpg" || file4=="jpeg" || file4=="webp" || file3=="gif" || file3=="mp4" || file4=="webm" || file3=="ogv"){
    img.src = "icons/file-media.svg";
    div.setAttribute('ondblclick', "openFile(this, 'media')");
    menu.appendChild(div);
    }
    
    // HTML file Open
    if(file3=='htm' || file4=='html'){
    img.src = "icons/html.svg";
    div.setAttribute('ondblclick', "openFile(this, 'html')");
    menu.appendChild(div);
    }
    
    // CSS file Open
    if(file3=='css'){
    img.src = "icons/css.svg";
    div.setAttribute('ondblclick', "openFile(this, 'css')");
    menu.appendChild(div);
    }
    
    // JS file Open
    if(file3=='.js' || file4 == "json"){
    img.src = "icons/js.svg";
    div.setAttribute('ondblclick', "openFile(this, 'js')");
    menu.appendChild(div);
    }
    
    // GS file Open
    if(file3=='.gs'){
    img.src = "icons/js.svg";
    div.setAttribute('ondblclick', "openFile(this, 'js')");
    menu.appendChild(div);
    }
    
    }
    }
    })
    .catch(err => {console.log(err)});
  }
   
   
   
   // Show menu & Close menu
   
   let menuBtnStatus = true;
   function OpenMenu(){
   if(menuBtnStatus){
   container.style.position = "fixed";
   menuDiv.style.display = "inline";
   menu.style.left = "0";
   menuBtnStatus = false;
   }
   else{
   container.style.position = "";
   menuDiv.style.display = "";
   menu.style.left = "";
   menuBtnStatus = true;
   }
   }
   
 
 // Open Directory
   
   function openDir(path){
   var form = new FormData();
   form.append("path", path);
   var url = "/editor/php/path.php";
   fetch(url,{
   method: "POST",
   mode: "no-cors",
   header:{
   'Content-Type': 'application/json'
   },
   body:  form
   })
   .then(res => res.text())
   .then(text => {
   //console.log(text)
   let data = JSON.parse(text);
   
   //add Folder & add File Button
   {
   let div = document.createElement('div');
   div.setAttribute('class', 'menu-item item2');
   div.setAttribute('ondblclick', "let div = document.getElementById(this.getAttribute('path')); if(div.innerText=='Add New Folder'){div.innerText=''}; div.setAttribute('contenteditable', ''); div.focus()");
   div.setAttribute('path', "folder"+path );
   let item = document.createElement('div');
   item.setAttribute('class', 'item');
   let img = document.createElement('img');
   img.src = "icons/add-folder.svg";
   let nam = document.createElement('div');
   nam.setAttribute('class', 'name');
   nam.setAttribute('id', 'folder'+path);
   nam.setAttribute('path', path);
   nam.setAttribute('onblur', 'if(this.innerText==""){this.innerText="Add New Folder"; this.removeAttribute("contenteditable");}');
   nam.setAttribute('oninput', "if(this.innerText.match('\\n')){if(this.innerHTML=='<div><br></div><div><br></div>'){this.innerText=''; this.blur();}else{addNew(this,this.innerText.substr(0, this.innerText.search('\\n')), 'folder');}}");
   nam.setAttribute('style', 'width:100%;outline:none;color:#555;');
   nam.innerText="Add New Folder" //data.folder[i].replace(path+'/','')
   item.appendChild(img);
   item.appendChild(nam);
   div.appendChild(item);
   document.getElementById(path).appendChild(div);
   }
   
   {
   let div = document.createElement('div');
   div.setAttribute('class', 'menu-item item2');
   div.setAttribute('ondblclick', "let div = document.getElementById(this.getAttribute('path')); if(div.innerText=='Add New File'){div.innerText=''}; div.setAttribute('contenteditable', ''); div.focus()");
   div.setAttribute('path', "file"+path );
   let item = document.createElement('div');
   item.setAttribute('class', 'item');
   let img = document.createElement('img');
   img.src = "icons/add-file.svg";
   let nam = document.createElement('div');
   nam.setAttribute('class', 'name');
   nam.setAttribute('id', "file"+path);
   nam.setAttribute('path', path);
   nam.setAttribute('onblur', 'if(this.innerText==""){this.innerText="Add New File"; this.removeAttribute("contenteditable");}');
   nam.setAttribute('oninput', "if(this.innerText.match('\\n')){if(this.innerHTML=='<div><br></div><div><br></div>'){this.innerText=''; this.blur();}else{addNew(this,this.innerText.substr(0, this.innerText.search('\\n')), 'file');}}");
   nam.setAttribute('style', 'width:100%;outline:none;color:#555;');
   nam.innerText="Add New File" //data.folder[i].replace(path+'/','')
   item.appendChild(img);
   item.appendChild(nam);
   div.appendChild(item);
   document.getElementById(path).appendChild(div);
   }
   
   // Folder List
   
   if(data.folder.length>0){
   for(let i=0; i<data.folder.length; i++){
   let div = document.createElement('div');
   div.setAttribute('class', 'menu-item item2');
   div.setAttribute('ondblclick', "openDir('"+data.folder[i]+"');this.removeAttribute('ondblclick')");
   div.setAttribute('id', data.folder[i] );
   let item = document.createElement('div');
   item.setAttribute('class', 'item');
   let img = document.createElement('img');
   img.src = "icons/file-directory.svg";
   let nam = document.createElement('div');
   nam.setAttribute('class', 'name');
   nam.innerText = data.folder[i].replace(path+'/','')
   item.appendChild(img);
   item.appendChild(nam);
   div.appendChild(item);
   document.getElementById(path).appendChild(div);
   }
   }
   
   
   // File List
   if(data.file.length>0){
   for(let i=0; i<data.file.length; i++){
   let div = document.createElement('div');
   div.setAttribute('class', 'menu-item item2');
   div.setAttribute('path', data.file[i]);
   let item = document.createElement('div');
   item.setAttribute('class', 'item');
   let img = document.createElement('img');
   img.src = "icons/file-text.svg";
   let nam = document.createElement('div');
   nam.setAttribute('class', 'name');
   nam.innerText = data.file[i].replace(path+'/','')
   item.appendChild(img);
   item.appendChild(nam);
   div.appendChild(item);
   
   
   let file3 = data.file[i].replace(path+'/','').substr(-3);
   let file4 = data.file[i].replace(path+'/','').substr(-4);
   
   
   // TEXT or README file open as text
   if(file3=='txt' || data.file[i].replace(path+'/','').toLowerCase()=='readme'){
   img.src = "icons/file-text.svg";
   div.setAttribute('ondblclick', "openFile(this, 'txt')");
   document.getElementById(path).appendChild(div);
   }
   
   // PHP file open as text
   if(file3=='php'){
   img.src = "icons/php.svg";
   div.setAttribute('ondblclick', "openFile(this, 'php')");
   document.getElementById(path).appendChild(div);
   }
   
   /*
   // SVG file open as text
   if(file3=='svg'){
   img.src = "icons/svg.svg";
   div.setAttribute('ondblclick', "openFile(this, 'txt')");
   document.getElementById(path).appendChild(div);
   }
    
   // XML file open as text
   if(file3=='xml'){
   img.src = "icons/xml.svg";
   div.setAttribute('ondblclick', "openFile(this, 'txt')");
   document.getElementById(path).appendChild(div);
   }*/
   
   // PDF file Open
   if(file3=='pdf'){
   img.src = "icons/file-pdf.svg";
   div.setAttribute('ondblclick', "openFile(this, 'pdf')");
   document.getElementById(path).appendChild(div);
   }
   
   // Media File Open
   if(file3=='png' || file3=="jpg" || file4=="jpeg" || file4=="webp" || file3=="gif" || file3=="mp4" || file4=="webm" || file3=="ogv"){
   img.src = "icons/file-media.svg";
   div.setAttribute('ondblclick', "openFile(this, 'media')");
   document.getElementById(path).appendChild(div);
   }
   
   // HTML file Open
   if(file3=='htm' || file4=='html'){
   img.src = "icons/html.svg";
   div.setAttribute('ondblclick', "openFile(this, 'html')");
   document.getElementById(path).appendChild(div);
   }
   
   // CSS file Open
   if(file3=='css'){
   img.src = "icons/css.svg";
   div.setAttribute('ondblclick', "openFile(this, 'css')");
   document.getElementById(path).appendChild(div);
   }
   
   // JS file Open
   if(file3=='.js' || file4=="json"){
   img.src = "icons/js.svg";
   div.setAttribute('ondblclick', "openFile(this, 'js')");
   document.getElementById(path).appendChild(div);
   }
   
   // GS file Open
   if(file3=='.gs'){
   img.src = "icons/js.svg";
   div.setAttribute('ondblclick', "openFile(this, 'js')");
   menu.appendChild(div);
   }
   
   }
   }
   
   })
   .catch(err => {console.log(err)});
   }
   
   // Add new Folder/ Files in main container
   function addNewMain(id, value, cmd){
   var form = new FormData();
   form.append("cmd[]", "cd '" + id.getAttribute('path').replace(/'/g,'"') +"'");
   if(cmd=='folder'){
   form.append("cmd[]", "mkdir '" + value +"'");
   }
   else{
   form.append("cmd[]", "touch '" + value +"'");
   }
   let url = "/editor/php/cmd.php";
   fetch(url,{
   method: "POST",
   mode: "no-cors",
   header:{
   'Content-Type': 'application/json'
   },
   body:  form
   
   })
   .then(res => res.text())
   .then(text => {
   
   menu.innerHTML = '';
   init()
   }
   ).catch( err => console.log(err));
   
   id.innerText = '';
   id.blur();
   
   }
   
   // Add new Folder/File in any Folder
   function addNew(id, value, cmd){
   var form = new FormData();
   form.append("cmd[]", "cd '" + id.getAttribute('path').replace(/'/g,'"') +"'");
     if(cmd=='folder'){
   form.append("cmd[]", "mkdir '" + value +"'");
   }
   else{
   form.append("cmd[]", "touch '" + value +"'");
   }
   let url = "/editor/php/cmd.php";
   fetch(url,{
   method: "POST",
   mode: "no-cors",
   header:{
   'Content-Type': 'application/json'
   },
   body:  form
   
   })
   .then(res => res.text())
   .then(text => {
   document.getElementById(id.getAttribute('path')).innerHTML = "";
   openDir(id.getAttribute('path'));
   }
   ).catch( err => console.log(err));

   id.innerText = '';
   id.blur();
  
   }
   
   // Open File
   function openFile(id, type){
   if(type=="media"){
   let a = document.createElement('a');
   a.setAttribute('style', 'display:none');
   a.setAttribute('target', '_blank');
   a.href = id.getAttribute('path').replace('/sdcard','');
   id.appendChild(a);
   a.click();
   a.remove();
   //OpenMenu()
   }
   
   else if(type=="pdf"){
   let a = document.createElement('a');
   a.setAttribute('style', 'display:none');
   a.setAttribute('target', '_blank');
   a.href = "/Download/pdfjs-2.8.335-dist/web/viewer.html?file=" + id.getAttribute('path').replace('/sdcard','');
   id.appendChild(a);
   a.click();
   a.remove();
   //OpenMenu()
   }
   
   else{
   
   if(document.getElementById('openedFile')){
     document.getElementById('openedFile').removeAttribute('id');
   }
   id.setAttribute('id', 'openedFile');
   let form = new FormData();
   let path = id.getAttribute('path');
   form.append("path", path);
   let url = "/editor/php/content.php";
   fetch(url,{
   method: "POST",
   mode: "no-cors",
   header:{
   'Content-Type': 'application/json'
   },
   body:  form
   
   })
   .then(res => res.text())
   .then( sourceCode => {
     unlock = true;
     
     document.getElementById("undo-btn").onclick = function(){
       editor.trigger('aaaa', 'undo', 'aaaa');
       editor.focus();
     }
     document.getElementById("redo-btn").onclick = function(){
       editor.trigger('aaaa', 'redo', 'aaaa');
       editor.focus();
     }
     document.getElementById("browsing").onclick = function(){document.getElementById("browsing").href = path.replace('/sdcard', '')}
     document.getElementById("save-btn").onclick = function(){
       let form = new FormData();
       form.append("path", path);
       form.append("data", editor.getValue());
       let url = "/editor/php/saved.php";
       fetch(url,{
       method: "POST",
       mode: "no-cors",
       header:{
       'Content-Type': 'application/json'
       },
       body:  form
       })
       .then(res => res.text())
       .then(text => {
         if(text == "saved") file_lock.src = "icons/lock.svg";
       }
       ).catch( err => console.log(err));
     }
     
     file_name.value = path.slice((-1)*path.split('').reverse().join('').indexOf('/'));
     file_lock.src = "icons/lock.svg";
     file_icon.src = "icons/"+ type +".svg";
     
     type = (type == "js") ? "javascript" : type;
     
     
     if(typeof editor == "object"){
       editor.dispose();
       //console.log(editor)
     }
     
     emmetMonaco.emmetHTML(monaco)
     editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: sourceCode,
        language: type,
        fontSize: 17,
        tabSize: 4,
      });
      
      editor.onDidChangeModelContent(function(e){
        if(unlock) file_lock.src = "icons/lock-open.svg";
      })
      
   }
   ).catch( err => console.log(err));
   OpenMenu()
   }
   }
   
   
  window.onbeforeunload = function(){
    return 'Are you sure you want to leave?';
  };
 
 
  // Keyboard Short-Cut
  window.addEventListener('keydown', key);
  
  function key(e){
    if(e.keyCode == 122){
    
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.getElementById('editor-container').style.height = screen.height + "px"
        
      } 
      else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      
    }
    if(e.ctrlKey && e.shiftKey){
      if(e.keyCode == 77){
        OpenMenu();
      }
      else if(e.keyCode == 83){
        document.getElementById("save-btn").click();
      }
      else if(e.keyCode == 87){
        document.getElementById("browsing").click();
      }
    }
  }
  