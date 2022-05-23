function GetURLParameter(parameter){
  let data = [];
  let url = window.location.toString();
  
  if(url.indexOf('?') >= 0){
	url = url.substr(url.indexOf('\?'))
	let searchParams = new URLSearchParams(url);
	if(searchParams.has(parameter)){
	  data = searchParams.getAll(parameter);
	}
  }
  return data;
}

function GetFileName(path){
  path = path.split(""). reverse().join("");
  return path.substr(0, path.indexOf("/")).split("").reverse().join("");
}

ace.config.setModuleUrl("ace/theme/xcode", "./js/theme-xcode.js");
ace.config.setModuleUrl("ace/theme/tomorrow", "./js/theme-tomorrow.js");
ace.config.setModuleUrl("ace/mode/html", "./js/mode-html.js");
ace.config.setModuleUrl("ace/mode/css", "./js/mode-css.js");
ace.config.setModuleUrl("ace/mode/javascript", "./js/mode-javascript.js");
ace.config.setModuleUrl("ace/mode/jsx", "./js/mode-jsx.js");
ace.config.setModuleUrl("ace/mode/php", "./js/mode-php.js");

let container = '<div class="discrebtion">' + 
		   '<div class="title">'+
			   '<div>${editorName}</div>'+
			  ' <div class="button-div">'+
				   '<button onclick="undo(${editor})" class="button">undo</button>'+
				   '<button onclick="redo(${editor}\)" class="button">redo</button>'+
				   '<button onclick="changeCursor(' + "'previous'," + '${editor})" style="padding-left: 10px; padding-right: 10px;" class="button">&#8676;</button>'+
				   '<button onclick="changeCursor(' + "'next'," + '${editor})" style="padding-left: 10px; padding-right: 10px;" class="button">&#8677;</button>'+
				   '<button onclick="save(${path}, this, ${editor})" class="button">save</button>'+
				'</div>'+
            '</div>'+
		   '<div class="editor" id="${editor}-div">loading...</div>'+
	   '</div>';

let html, css, js, jsx, php;
const Editor = {
  "html": {
    mode: "html",
    theme: "tommorow"
  },
  "css": {
    mode: "css",
    theme: "tommorow"
  },
  "js":{
    mode: "javascript",
    theme: "xcode"
  },
  "jsx":{
    mode: "jsx",
    theme: "xcode"
  },
  "php": {
    mode: "php",
    theme: "xcode"
  }
}

for(let x in Editor){
  let parameters = GetURLParameter(x);
  for(let i = 0; i < parameters.length; i++){
    let path;
    if(parameters[i][0] == "~"){
	    path = "'"+ parameters[i] + "'";
	  }
	  else {
	    path = `'/sdcard/${parameters[i]}'`;
	  }
    let div = document.createElement("div");
    let editorName = GetFileName(parameters[i]) ? GetFileName(parameters[i]) : x.toUpperCase();
    let editor = x + i;
    div.innerHTML = eval("`" + container + "`");
	  document.body.appendChild(div);
	  eval(`
	    ${x + i} = ace.edit("${x + i}-div");
	    ${x + i}.setTheme("ace/theme/${Editor[x].theme}");
	    ${x + i}.session.setMode("ace/mode/${Editor[x].mode}")
	    ${x + i}.session.setTabSize(2);
	    ${x + i}.setOptions({
	      enableBasicAutocompletion: true,
	      enableSnippets: true,
	      enableLiveAutocompletion: true,
	      readOnly: true
	    })
	    
	    path = path[0].replace("'", "") + path.substr(1, path.length - 2) + path[path.length - 1].replace("'","");
	    fetch("php/content.php?path=" + path).then(res => res.text())
	    .then(text => {
	      ${x + i}.session.setValue(text);
	      ${x + i}.setReadOnly(false);
	      console.log(text);
	    })
	  `);
  }
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