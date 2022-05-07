function GetURLParameter(parameter){
  let data = '';
  let url = window.location.toString();
  
  if(url.indexOf('?') >= 0){
	url = url.substr(url.indexOf('\?'))
	let searchParams = new URLSearchParams(url);
	if(searchParams.has(parameter)){
	  data = searchParams.get(parameter);
	}
  }
  return data;
}

ace.config.setModuleUrl("ace/theme/xcode", "./js/theme-xcode.js");
ace.config.setModuleUrl("ace/theme/tomorrow", "./js/theme-tomorrow.js");
ace.config.setModuleUrl("ace/mode/html", "./js/mode-html.js");
ace.config.setModuleUrl("ace/mode/css", "./js/mode-css.js");
ace.config.setModuleUrl("ace/mode/javascript", "./js/mode-javascript.js");
ace.config.setModuleUrl("ace/mode/php", "./js/mode-php.js");
/*ace.config.setModuleUrl("ace/worker/html", "./js/worker-html.js");
ace.config.setModuleUrl("ace/worker/css", "./js/worker-css.js");
ace.config.setModuleUrl("ace/worker/javascript", "./js/worker-javascript.js");
ace.config.setModuleUrl("ace/worker/php", "./js/worker-php.js");
*/

let container = '<div class="discrebtion">' + 
		   '<div class="title">'+
			   '<div>${editorName}</div>'+
			  ' <div class="button-div">'+
				   '<button onclick="undo(${editor})" class="button">undo</button>'+
				   '<button onclick="redo(${editor})" class="button">redo</button>'+
				   '<button onclick="changeCursor(' + "'previous'," + '${editor})" style="padding-left: 10px; padding-right: 10px;" class="button">&#8676;</button>'+
				   '<button onclick="changeCursor(' + "'next'," + '${editor})" style="padding-left: 10px; padding-right: 10px;" class="button">&#8677;</button>'+
				   '<button onclick="save(${path}, this, ${editor})" class="button">save</button>'+
				'</div>'+
            '</div>'+
		   '<div class="editor" id="${editor}-div">loading...</div>'+
	   '</div>';

let html, css, js, php;
if(GetURLParameter('html')){
	let div = document.createElement("div");
	let editor = 'html';
	let editorName = "HTML";
	if(GetURLParameter('html')[0] == "~"){
	  path = GetURLParameter('html');
	}
	else {
	  path = `'/sdcard/${GetURLParameter('html')}'`;
	}
	div.innerHTML = eval("`" + container + "`");
	document.body.appendChild(div);
	
	html = ace.edit("html-div");
	html.setTheme("ace/theme/tommorow");
	html.session.setMode("ace/mode/html")
	html.session.setTabSize(2);
	html.setOptions({
	  enableBasicAutocompletion: true,
	  enableSnippets: true,
	  enableLiveAutocompletion: true,
	  readOnly: true
	})
	
	path = path[0].replace("'", "") + path.substr(1, path.length - 2) + path[path.length - 1].replace("'","");
	fetch("php/content.php?path=" + path).then(res => res.text())
	.then(text => {
	  html.session.setValue(text);
	  html.setReadOnly(false);
	  console.log(text);
	})
}

if(GetURLParameter('css')){
	let div = document.createElement("div");
	let editor = 'css';
	let editorName = "CSS";
	if(GetURLParameter('css')[0] == "~"){
	  path = GetURLParameter('css');
	}
	else {
	  path = `'/sdcard/${GetURLParameter('css')}'`;
	}
	div.innerHTML = eval("`" + container + "`");
	document.body.appendChild(div);
	
	css = ace.edit("css-div");
	css.setTheme("ace/theme/tommorow");
	css.session.setMode("ace/mode/css")
	css.session.setTabSize(2);
	css.setOptions({
	  enableBasicAutocompletion: true,
	  enableSnippets: true,
	  enableLiveAutocompletion: true,
	  readOnly: true
	});
	
	path = path[0].replace("'", "") + path.substr(1, path.length - 2) + path[path.length - 1].replace("'","");
	fetch("php/content.php?path=" + path).then(res => res.text())
	.then(text => {
	  css.session.setValue(text);
	  css.setReadOnly(false);
	})
}

if(GetURLParameter('js')){
	let div = document.createElement("div");
	let editor = 'js';
	let editorName = "JavaScript";
	if(GetURLParameter('js')[0] == "~"){
	  path = GetURLParameter('js');
	}
	else {
	  path = `'/sdcard/${GetURLParameter('js')}'`;
	}
	div.innerHTML = eval("`" + container + "`");
	document.body.appendChild(div);
	
	js = ace.edit("js-div");
	js.setTheme("ace/theme/xcode");
	js.session.setMode("ace/mode/javascript")
	js.session.setTabSize(2);
	js.setOptions({
	  enableBasicAutocompletion: true,
	  enableSnippets: true,
	  enableLiveAutocompletion: true,
	  readOnly: true
	});
	
	path = path[0].replace("'", "") + path.substr(1, path.length - 2) + path[path.length - 1].replace("'","");
	fetch("php/content.php?path=" + path).then(res => res.text())
	.then(text => {
	  js.session.setValue(text);
	  js.setReadOnly(false);
	})
}

if(GetURLParameter('php')){
	let div = document.createElement("div");
	let editor = 'php';
	let editorName = "PHP";
	if(GetURLParameter('php')[0] == "~"){
	  path = GetURLParameter('php');
	}
	else {
	  path = `'/sdcard/${GetURLParameter('php')}'`;
	}
	div.innerHTML = eval("`" + container + "`");
	document.body.appendChild(div);
	
	php = ace.edit("php-div");
	php.setTheme("ace/theme/xcode");
	php.session.setMode("ace/mode/php")
	php.session.setTabSize(2);
	php.setOptions({
	  enableBasicAutocompletion: true,
	  enableSnippets: true,
	  enableLiveAutocompletion: true,
	  readOnly: true
	});
	
	path = path[0].replace("'", "") + path.substr(1, path.length - 2) + path[path.length - 1].replace("'","");
	fetch("php/content.php?path=" + path).then(res => res.text())
	.then(text => {
	  php.session.setValue(text);
	  php.setReadOnly(false);
	})
}

function undo(editor){
  editor.undo();
}

function redo(editor){
  editor.redo();
}

function save(path, btn, editor){
  btn.innerText = "saving";
  btn.disabled = true;
  let form = new FormData();
  form.append("path", path);
  form.append("data", editor.session.getValue());
  var url = "php/content.php";
  fetch(url,{
  method: "POST",
  mode: "no-cors",
  header:{
  'Content-Type': 'application/json'
  },
  body:  form
  }).then(res => res.text())
  .then(text => {
    console.log(text);
    if(text == "success"){
      btn.innerText = "save";
      btn.disabled = false;
    }
  })
}

function changeCursor(type, editor){
  let position = editor.getCursorPosition();
  if(type=="next") ++position.column;
  else --position.column;
  editor.clearSelection();
  editor.moveCursorToPosition(position);
  let position2 = editor.getCursorPosition();
  if(type=="next"){
    --position.column;
    ++position.row;
  }
  else {
    ++position.column;
    --position.row;
  }
  if(position.column == position2.column){
    position.column = 0;
    if(type!= 'next') position.column = Infinity;
    editor.moveCursorToPosition(position);
    //editor.clearSelection();
  }
  editor.focus();
}

let input = document.createElement('input');
//input.value = "123";
input.setAttribute("style", "width: 1px; height: 1px; margin: -190000px;");
document.body.appendChild(input);
input.focus();
//input.value = "1237";
window.onbeforeunload = function () {
  return 'Are you really want to perform the action?';
}