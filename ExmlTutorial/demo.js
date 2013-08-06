//function ValueElement(key){
//	this.Key = key;
//}


ExML.Converters["InvertChars"]=new Converter(
    function(value){
    
        return 'x'+value;
    },
    function(value){
    
        return value.substr(1);
    }
);


function Demo(){
	var that = this;
    this.$html = $("<span />");

    GenNotifyProperty(this, "Nome", 'Hugo');

    GenNotifyProperty(this, "Sobrenome", "Miranda");

    GenNotifyProperty(this, "Idade", '11');

    //GenNotifyProperty(this,"Values",[new ValueElement('ola'),new ValueElement('eme')]);

    GenNotifyProperty(this,"Values",[{Key:'ola',SubValues:[{Key:'sub1'},{Key:'sub2'}]},{Key:'eme'}]);

    GenNotifyProperty(this,"Values2",["aaa","bbb"]);

    GenNotifyProperty(this,"Other", new Other());
    
    //observar alterações a Propriedade "Nome"
    //this.PropertyChanged(function(obj){
	//	console.log(obj);
    //});

    this.loadTemplate("demo.template", this);
}
Demo.MixIn(TemplateControl, NotifyPropertyChanged);


function Other(){
    console.log(this);
    GenNotifyProperty(this, "Idade", '15');
}
Other.MixIn(NotifyPropertyChanged);


//
//function ClassName(){
//	//private
//	var _private = "1";
//
//	//public 
//	this.publicvariable = "qq coisa";
//}
//
//ClassName.prototype = {
//	publicvariable:'outra coisa',
//	publicvariable2:'coisa2'
//}
//
//var classObject = new ClassName(); 
//classObject._private -> undefined;
//classObject.publicvariable -> "qq coisa";
//classObject.publicvariable2 -> "coisa2";
//

