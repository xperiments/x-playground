module LoadTemplateView { export var html =  '<!DOCTYPE html><html><head lang="en">	<meta charset="UTF-8">	<title></title>	{{styles}}	{{scripts}}	<style>{{css}}</style>	<script type="text/javascript">	window.onload=function(){		{{js}}	}	</script></head><body>{{body}}</body></html>' } 