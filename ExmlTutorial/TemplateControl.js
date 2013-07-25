var TemplateControl={
	hasTemplateControl:true,

	baseApplyTemplate:function(tpl){
		if(!this.$html)return console.log("add to your "+ String(arguments.callee.name) +" constructor: \'$(\"<div class='***'></div>\");\' ");
		this.$html.empty().append(tpl);
	},

	loadTemplate:function(templateName, dataContext){
		var that = this;

		(new Template(templateName, dataContext)).apply(function(tpl){ 
			if(that.applyTemplate)
				that.applyTemplate(tpl);
			else
				that.baseApplyTemplate(tpl);
		});

	}
};  