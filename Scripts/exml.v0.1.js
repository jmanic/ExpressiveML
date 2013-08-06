//INCLUDE:../static/loader-basic.js
//INCLUDE:../static/framework/Serializable.js
//INCLUDE:../static/framework/NotifyPropertyChanged.js
//INCLUDE:../static/framework/Template.js
//INCLUDE:../static/framework/Binding.js
//INCLUDE:../static/framework/MixIn.js

//ENDOFFILE:ignore remaining file

"use strict";

//isArray shim
if(!Array.isArray)Array.isArray=function(vArg){return Object.prototype.toString.call(vArg)==="[object Array]";};

//Shim for old IE
if(!window.console)window.console={warn:function(){},log:function(){}};

var getFunctionContructor=function(str){var a=str.split("."),fn=window||this;for(var i=0,L=a.length;i<L;)fn=fn[a[i++]];if(typeof fn!=="function")throw new Error("Function not found or not function:"+fn);return fn};

var LazyLoad=function(k){function p(b,a){var g=k.createElement(b),c;for(c in a)a.hasOwnProperty(c)&&g.setAttribute(c,a[c]);return g}function l(b){var a=m[b],c,f;if(a)c=a.callback,f=a.urls,f.shift(),h=0,f.length||(c&&c.call(a.context,a.obj),m[b]=null,n[b].length&&j(b))}function w(){var b=navigator.userAgent;c={async:k.createElement("script").async===!0};(c.webkit=/AppleWebKit\//.test(b))||(c.ie=/MSIE/.test(b))||(c.opera=/Opera/.test(b))||(c.gecko=/Gecko\//.test(b))||(c.unknown=!0)}function j(b,a,g,f,h){var j=
function(){l(b)},o=b==="css",q=[],d,i,e,r;c||w();if(a)if(a=typeof a==="string"?[a]:a.concat(),o||c.async||c.gecko||c.opera)n[b].push({urls:a,callback:g,obj:f,context:h});else{d=0;for(i=a.length;d<i;++d)n[b].push({urls:[a[d]],callback:d===i-1?g:null,obj:f,context:h})}if(!m[b]&&(r=m[b]=n[b].shift())){s||(s=k.head||k.getElementsByTagName("head")[0]);a=r.urls;d=0;for(i=a.length;d<i;++d)g=a[d],o?e=c.gecko?p("style"):p("link",{href:g,rel:"stylesheet"}):(e=p("script",{src:g}),e.async=!1),e.className="lazyload",
e.setAttribute("charset","utf-8"),c.ie&&!o?e.onreadystatechange=function(){if(/loaded|complete/.test(e.readyState))e.onreadystatechange=null,j()}:o&&(c.gecko||c.webkit)?c.webkit?(r.urls[d]=e.href,t()):(e.innerHTML='@import "'+g+'";',u(e)):e.onload=e.onerror=j,q.push(e);d=0;for(i=q.length;d<i;++d)s.appendChild(q[d])}}function u(b){var a;try{a=!!b.sheet.cssRules}catch(c){h+=1;h<200?setTimeout(function(){u(b)},20):a&&l("css");return}l("css")}function t(){var b=m.css,a;if(b){for(a=v.length;--a>=0;)if(v[a].href===
b.urls[0]){l("css");break}h+=1;b&&(h<200?setTimeout(t,20):l("css"))}}var c,s,m={},h=0,n={css:[],js:[]},v=k.styleSheets;return{css:function(b,a,c,f){j("css",b,a,c,f)},js:function(b,a,c,f){j("js",b,a,c,f)}}}(this.document);

if (window.applicationCache)
	window.applicationCache.addEventListener('updateready', function (e) {
		if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
			window.applicationCache.swapCache();
			
			if (confirm('Existe uma nova versão! Carregar agora?'))
				window.location.reload();
			
		}
	}, false);


if(typeof _sh === "undefined")var _sh={};

_sh.loadCount=0;
_sh.$loadControl=null;
_sh.timeToShowLoad=false;

_sh.beginLoad=function(){
	if(!_sh.$loadControl || !_sh.$loadControl.length)
		_sh.$loadControl = $("#apploading,#apploading_stylesheet");

	if(!_sh.loadCount++ && _sh.$loadControl)
		if(!_sh.timeToShowLoad)
			_sh.timeToShowLoad = setTimeout(function(){ _sh.$loadControl.stop(true).show(); },5);
};

_sh.endLoad=function(){
	if(!(--_sh.loadCount))
		if(_sh.timeToShowLoad){
			clearTimeout(_sh.timeToShowLoad);
			_sh.timeToShowLoad = null;
		};

	setTimeout(function(){
		if(_sh.loadCount)return;
		_sh.$loadControl.fadeOut("fast");
		if(_sh.timeToShowLoad){
			clearTimeout(_sh.timeToShowLoad);
			_sh.timeToShowLoad = null;
		};
	},500);
};



_sh.loadHistory={};
_sh.loadQueue=[];
_sh.loadCssQueue=[];


_sh.loadPaths=[];
_sh.requireMode = "smart"; 

_sh.require=function(path,cb){
	
	var hasCB=(typeof cb==="function");
	
	if(_sh.loadHistory[path] === true)return hasCB?cb():null;
	
	var smartMode = _sh.requireMode != "queue" || hasCB;
	
	if(!smartMode)
		return _sh.loadQueue[_sh.loadQueue.length] = path;
	
	if(!_sh.loadHistory[path]) _sh.loadHistory[path] = [];
	
	if(hasCB) _sh.loadHistory[path].push(cb);
	
	_sh.loadPaths[_sh.loadPaths.length] = path;

	var triggerCB = function(){
		_sh.endLoad();

		if(path !== _sh.loadPaths[_sh.loadPaths.length-1])return;
		
		
		var c;
		while(path = _sh.loadPaths.pop()){
			if(_sh.loadHistory[path].length)
				while(c = _sh.loadHistory[path].shift())
					c();
			
			_sh.loadHistory[path] = true;
		}
	};

	_sh.beginLoad();

	return LazyLoad.js(path, triggerCB);
};

_sh.requirecss=function(path){
	if(_sh.loadHistory[path])return;
	_sh.loadCssQueue[_sh.loadCssQueue.length] = path;
	_sh.loadHistory[path] = true;
}

var _require = _sh.require;
var _requirecss = _sh.requirecss;



//minified mix in
Object.MixIn=function(s,b,i){for(i in b)if(s[i]===undefined)s[i]=b[i];if(b[i='toString']&&s[i]===undefined&&b[i]!=s[i])s[i]=b[i];s._mix&&s._mix()};
Function.prototype.MixIn=function(i,a,b){for(i=0,a=arguments;i<a.length;)Object.MixIn(this.prototype,(b=a[i++]).prototype||b)};

var Serializable={
	
	hasSerializable:true,

	serializable:function(what){
		(this._serializables_||(this._serializables_=[])).push(what);
	},

	sleep:function(json){
		var o={},s=this._serializables_,i=s.length,n;

		function getValue(what){
			if(what._name && what.get)
				what = what.get();

			if($.isArray(what))
				return $.map(what,function(w){return getValue(w)});
			else
				return what&&what.hasSerializable?what.sleep(true):what;
		}
		
		for(;i-->0;)
			if(s[i]){
				var si = s[i].split('->'),
					n = si[0],
					t = si[1];

					o[n] = getValue(this[n]);
					//@todo may need type(t) support 
			}

		return json?o:JSON.stringify(o);
	},

	wakeup:function(strOrJs){
		//converts simple json to typed json
		var o = ("string" === typeof strOrJs) ? JSON.parse(strOrJs):strOrJs,s=this._serializables_,i=s.length,n,t;

		for(;i-->0;)
			if(s[i]){
				var si = s[i].split('->'),  //serializable information
					n = si[0],	//prperty name
					t = si[1],	//property type
					to = null;	//target object (output)

				if(t){
					// has type, o[n] is a property of input argument
					// if o[n] is array, push to output object all awake items
					// if o[n] is scalar, wakeup o[n]

					if(Array.isArray(o[n]) && (to=[]))
						for(var j in o[n])
							to.push(new(getFunctionContructor(t))().wakeup(o[n][j]) );
					else if(o[n])
						to = new(getFunctionContructor(t))().wakeup(o[n]);
					else
						to = [];
				}else
					to = o[n]; // NO TYPE, not needed to wakeup untyped values

				//depending if target variable is a Property, store accordingly
				if(this[n]._name && this[n].set)
					this[n].set(to);
				else
					this[n] = to;
			}

		return this;
	}
};

var NotifyPropertyChanged={
	
	hasNotifyPropertyChanged:true,
	eventHandlers:{},
	
	_mix:function(){
		this.eventHandlers=new Object();
	},
	
	triggerEH:function(name,param,old){
		var eh=this.eventHandlers[name];
		if("object"==typeof eh)
			for(var h in eh)
				eh[h](param,old);
	},
	
	registerEH:function(name,callback){
		var eh=(this.eventHandlers[name])?this.eventHandlers[name]:(this.eventHandlers[name]=[]);
		eh[eh.length]=callback;
	},

	unregisterEH:function(name,callback){
		var eh=this.eventHandlers[name];
		if("object"==typeof eh)
			for(var h in eh)
				if(eh[h]===callback){
					delete eh[h];
					return;
				}
	},
	
	OnPropertyChanged:function(_name){
		this.triggerEH("PropertyChanged",{sender:this,name:_name});
	},
	
	PropertyChanged:function(_callback){
		this.registerEH("PropertyChanged",_callback);
	},
	
	RemovePropertyChanged:function(_callback){
		this.unregisterEH("PropertyChanged",_callback);
	}
		
};

var ExML={Converters:{}};
function Converter(convert, convertBack){
	this.convert=convert;
	this.convertBack=convertBack;
}

function Property(get,set){
	this._name='Property';
	if(typeof get === "function")this.get = get;
	if(typeof set === "function")this.set = set;
}
Property.prototype={
	_name:'',
	get:function(){},
	set:function(){},
	toString:function(){
		return this.get().toString();
	}	
}

function GenNotifyProperty(obj,propname,defaultValue,_get,_set){
	obj["_field_"+propname] = defaultValue;
	
	var get = (typeof _get !=="function") ? function(){
		return obj["_field_"+propname]; 
	} : _get;
	
	var set = (typeof _set !=="function") ? function(value){ 
		obj["_field_"+propname]=value;
		obj.OnPropertyChanged(propname);
	} : _set;

	obj[propname] = new Property(get,set);
	obj[propname]._name = propname;
	
	return obj[propname];
}









(function($) {
      
      var _old = $.fn.attr;
      $.fn.attr = function() {
      var a, aLength, attributes,	map;
      if (this[0] && arguments.length === 0) {
            map = {};
            attributes = this[0].attributes;
            aLength = attributes.length;
            for (a = 0; a < aLength; a++) {
                  map[attributes[a].name.toLowerCase()] = attributes[a].value;
            }
            return map;
      } else {
            return _old.apply(this, arguments);
      }
}
}(jQuery));

function Binding(options) {

    var dc = options.dataContextObj = options.dataContextObj = options.dataContext.get ? options.dataContext.get() : options.dataContext;
	
	if(!dc)
		return console.error(options.targetProperty, ": I have no datacontext. Is my template dataContext correct?");

	for(var i in options.options)
		switch(options.options[i]){
			case "create":GenNotifyProperty(dc,options.targetProperty.toString(),"");break;
			case "serializable":dc.serializable(options.targetProperty.toString());break;
			default:
				var opt = options.options[i].split("=");
				if(opt[0]=="converter" && opt[1]){
					if(ExML.Converters[opt[1]])
						options.converter = ExML.Converters[opt[1]];
					else
						console.warn("Can't find converter "+opt[1]);
				}
			break;
		}

	if (Binding.GetPropertyByPath(dc, options.targetProperty) === undefined)
	    return console.warn("Binding - " + options.targetProperty + " not found!"), options = null, null;
	
	this.options = options;
	this.makeBinding();
	Binding.list[Binding.list.length] = this;
}

Binding.GetPropertyByPath = function(source, path) {
    if (!source || !path || typeof source != "object") {
        console.log("Binding.GetPropertyByPath with invalid source or path:", source, path);
        return null;
    }
    var originalPath = path;
    var path = path.split(".");
    var dc = source;
    var ret;
    var p = path.shift();

    do {
        
        if(!dc){
        	console.log(originalPath + " has a null property in its path, parent of ",p);
        	return null;
        }

        ret = dc[p];
        dc = ret&&ret.get ? ret.get() : ret;
    } while (ret && (p = path.shift()));

    return ret;
}

Binding.GetPropertyParentByPath = function(source, path) {
    if (!source || !path || typeof source != "object") {
        console.log("Binding.GetPropertyByPath with invalid source or path:", source, path);
        return null;
    }
    var originalPath = path;
    var path = path.split(".");

    if(path.length<2)return source;

    var dc = source;
    var ret;
    var p = path.shift();

    do {
        
        if(!dc){
        	console.log(originalPath + " has a null property in its path, parent of ",p);
        	return null;
        }

        ret = dc[p];
        dc = ret&&ret.get ? ret.get() : ret;
    } while (ret && (p = path.shift()) && path.length > 1);

    return dc.get?dc.get():dc;
}


Binding.list=[];
Binding.visualParent={};


Binding.prototype={

	options:null,
	makeBinding:function(){

		var self=this;
		var o = this.options;
		var tProperty = Binding.GetPropertyByPath(o.dataContextObj, o.targetProperty);
		var propertyParent = Binding.GetPropertyParentByPath(o.dataContextObj, o.targetProperty);

		//console.log("Binding: " + o.targetProperty + " => " + (tProperty.get?tProperty.get():tProperty));

		if(!tProperty)return;
		
		if(o.mode != Binding.Mode.OneTime){
			if(!propertyParent.PropertyChanged)
				console.warn(o.targetProperty + " can't notify changes! ");
			
			propertyParent.PropertyChanged(function(e){
				self.applyValue(e);
			});

		}
		this.applyValue({name:o.targetProperty});
		
		function convertBack(value){
			return o.converter ? o.converter.convertBack(value) : value;
		}

		
		if(o.mode===Binding.Mode.TwoWay){
			if(!tProperty.set || !tProperty.get)
				console.warn(o.targetProperty + " is (currently) not a TwoWay property. It may not work!");
			
			o.$obj.change(function(p){
				var value = o.useJQueryVal?o.$obj.val():o.$obj.prop(o.prop);
				tProperty.set( convertBack(value) );
			});
			
			o.$obj.keyup(function(){
				var value = o.useJQueryVal?o.$obj.val():o.$obj.prop(o.prop);
				if(value != tProperty.get())
					tProperty.set( convertBack(value) );
			});
	
		}
	},
	
	Dispose:function(){
	
	},

	applyValue:function(a){
		var o = this.options;
		var $obj = o.$obj;
		//console.log(a.name, o.targetProperty);

		if(a.name !== o.targetProperty)
			return;
		
		var tProperty = Binding.GetPropertyByPath(o.dataContextObj, o.targetProperty);
		
		function convert(value){
			return o.converter ? o.converter.convert(value) : value;
		}

		if(o.prop == "value" && $obj.is(":input")){
			var converted = String(convert(tProperty));
			if(String($obj.val()) != converted)
				$obj.val(converted);
		
		}else{
			switch(o.prop){
				case "content":
					$obj.children().detach();
					$obj.empty();
					$obj.append(convert(this.resolveContent(tProperty)));
				break;
				case "items":
					this.applyItems(convert(tProperty));
				break;
				default:
					if($obj.attr(o.prop) != convert(tProperty))
						$obj.attr(o.prop,convert(tProperty));
			}
		}
	},
	
	resolveContent:function(propOrVar){
		if(propOrVar === undefined)throw "propOrVar must not be undefined";

		if(propOrVar.get){
			var c = propOrVar.get();

			if(c!=null && c.$html)
				return c.$html;

			return ("string" == typeof c && c.as) ? c.as(String.getGlobalLang()) : c;
		}
		return ("string" == typeof propOrVar && propOrVar.as) ? propOrVar.as(String.getGlobalLang()) : propOrVar;
	},

	applyItems:function(tProperty){
		var that=this;
		
		var presenter = that.options.$obj.find('.itemPresenter:first');
		presenter = presenter.length?presenter:that.options.$obj;
		
		var itemTemplateID = that.options.$obj.attr('itemTemplateID');
		var itemsList = tProperty.get();		
		
		// SELECTS 
		if(presenter.is("select")){
			var select = presenter.get(0);
			select.options = [];

			var rawOptions=that.options.options;
			var bindingOptions = {};

			for(var o in rawOptions)if(rawOptions[o].split){
				var _bopt = rawOptions[o].split("=");
				bindingOptions[_bopt[0]] = _bopt[1];
			}
			
			for(var i in itemsList){
				var item = itemsList[i];

				var value = bindingOptions["value"] ? item[bindingOptions["value"]] : i; //use binding option or index position "{....,value=Property}"
				if(value.get)value = value.get();

				var text =  bindingOptions["text"] ? item[bindingOptions["text"]] : item;  //use binding option or value "{....,text=Property}"
				if(text.get)text = text.get();
				
				var option = document.createElement('option');
				option.text = text;
				option.value = value;
				select.options[select.options.length] = option;
			}

		}else{

			// DIVS
			presenter.empty();
			if(itemTemplateID)
				for(var i in itemsList)
					(new Template(itemTemplateID, itemsList[i], 'id')).apply(function(d){
						presenter.append(that.resolveContent(d));
					});
		}
	}
}
Binding.Mode={
	OneTime:0,
	OneWay:1,
	TwoWay:2
};








function Template(file,defaultContext,mode){
	this.mode = (mode===undefined) ? 'file' : mode;

	this.templateFile=file;
	this.cbList=[];
	
	GenNotifyProperty(this,"DataContext",defaultContext);
}


Template.baseDir="";
Template.cache = {};
Template.generateCacheTemplateName = function(prefix){
	if(prefix===undefined)prefix='tpl_';
	if(Template.cache.__count ===undefined)Template.cache.__count=0;
	var r;
	do{ r = prefix + (++Template.cache.__count); }while(Template.cache[r] !== undefined);
	return r;
};

Template.extractSubTemplates=function($x){
	$x.find('.itemTemplate').not(":has(.itemTemplate)").each(function(){
		var $t = $(this);
		do{
			var tpl_id = $t.attr('name');
			if(!tpl_id)tpl_id = Template.generateCacheTemplateName();
			
			var $par = $t.parent();
			
			$t.children().first().attr('TPLOwnerTag',$t.get(0).tagName);

			Template.cache[tpl_id]=$t.removeClass('itemTemplate').remove().html();
			
			$par.attr("itemTemplateID",tpl_id);
			
		}while(($t = $par.parent('.itemTemplate').not(":has(.itemTemplate)")).length);
	});
};

Template.prototype={
	isTemplateLoaded:null,
	isLoading:null,
	templateFile:null,
	cbList:null,
	
	cachedTemplate:function(){
		var i = this.templateFile;
		if(Template.cache[i])
			return Template.cache[i];
	},
	
	apply:function(cb){
		this.cbList[this.cbList.length] = cb;
		this.load();	
	},
	
	cacheTemplate:function(file,htmlText){
		var $x;
		
		try{
			$x = jQuery("<div/>").html(htmlText);
			
		}catch(e){
			console.log("Error parsing template: "+this.templateFile + " - " +e);
		}
		
		
		Template.extractSubTemplates($x);
		
		htmlText = $x.html();
		Template.cache[file]=htmlText;
		return htmlText;
	},
	
	applyBindings:function(htmlText){

		var myregexp = /\{(\{?)(\|?)([\w\d-\.]+)(\-\>([\w\d-\.]+))?(,\s?([\s\S]*?))?\}+/g;
		var self = this;
		
		var originalTag = htmlText.match(/tplownertag=\"(\w+?)\"/);
		if(originalTag && originalTag[1])
			originalTag = originalTag[1];
		else
			originalTag="DIV";

		var $x = jQuery("<"+originalTag+" class='bindingzone'/>").html(htmlText);
		$x.data('DataContext',self.DataContext);

		$x.find("*").each(function(){
			
			
				var $elem = $(this);
				var attr = $elem.attr();
				for(var k in attr){
					var attrib = attr[k];
					if(attrib[0] === "{"){
					
						myregexp.lastIndex=0;
						var match = myregexp.exec(attrib);
						
						if(match == null)continue; 
						
						var twoway = match[1]== "{";
						var onetime = match[2]=="|";
						var targetProperty = match[3];
						var options=(match[6]||"").split(',');
						
						if(match[5])options.push("converter="+match[5]);//normalize converter

						var mode = (onetime?Binding.Mode.OneTime:(twoway?Binding.Mode.TwoWay:Binding.Mode.OneWay));
						
						$elem.removeAttr(k);
					
						(new Binding({
							$obj:$elem,
							prop:k,
							dataContext:self.DataContext,
							targetProperty:targetProperty,
							mode:mode,
							options:options
						}));
					}	
				}
			
		});
		return $x;
	},
		
	callbackList:function(param){
		this.cbList.reverse();
		var popped;

		var produced =  this.applyBindings(param);
		
		if(typeof ControlLoader !== "undefined")
			produced = ControlLoader.load(produced);

		while(popped = this.cbList.pop())
			popped( produced );
		
		
	},
	
	loadComplete:function(file,t){
		t = this.cacheTemplate(file,t);

		if(this.isLoading && file == this.templateFile){
			this.isLoading = false;
			this.callbackList(t);
		}
	},
	
	load:function(){

		var self = this;
		if(this.isLoading)return;
		
		var tpl = null;

		if(tpl=self.cachedTemplate())
			return self.callbackList(tpl) ,null;
		

		if(self.templateFile!=null){

			var loader = function(){
				self.isLoading=true;

				jQuery.get(Template.baseDir +  self.templateFile/* + '?r'+Math.random()*/,null,function(t,s){
					
					if(s=='success') self.loadComplete(self.templateFile,t);
					else loader();
					
				},'html');	
			}

			loader();
		}
	},
}



//I dont want code on line 666
jQuery.fn.getDataContext=function(){
	var elem = this;
	while(elem.length){
		if(elem.data("DataContext")) 
			return elem.data("DataContext");
		elem = elem.parent();
	}
	return null;
}