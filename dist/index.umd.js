!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("@hotwired/stimulus")):"function"==typeof define&&define.amd?define(["@hotwired/stimulus"],e):(t||self).StimulusNestedForm=e(t.Stimulus)}(this,function(t){function e(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,o(n.key),n)}}function r(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function n(t,e){return n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},n(t,e)}function o(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:e+""}var i=/*#__PURE__*/function(){function t(t){this.controller=t}var e=t.prototype;return e.run=function(){var t=this.clone(this.template);return t.style.display="",this.renewIndex(t,this.forms.length+this.controller.startValue),t},e.clone=function(t){var e=t.cloneNode(!0);return this.clear(e),this.setRadio(e),this.removePK(e),e},e.clear=function(t){t.querySelectorAll("textarea, input[type=text]").forEach(function(t){return t.value=""}),t.querySelectorAll("input[type=radio], input[type=checkbox]").forEach(function(t){return t.checked=!1}),t.querySelectorAll("option").forEach(function(t){return t.selected=!1}),t.querySelectorAll('input[name$="[_destroy]"]').forEach(function(t){return t.removeAttribute("value")})},e.setRadio=function(t){var e=Array.from(t.querySelectorAll("input[name][type=radio]")).map(function(t){return t.name});new Set(e).forEach(function(e){var r=Array.from(t.querySelectorAll('input[type=radio][name="'+e+'"]'));r.every(function(t){return 0==t.checked})&&(r[0].checked=!0)})},e.removePK=function(t){var e=this.assocs.map(function(t){return new RegExp(t.description+"(\\])?\\[\\d+\\]\\["+t.pk+"\\]$")});t.querySelectorAll("input[name][type=hidden]").forEach(function(t){e.forEach(function(e){t.name.match(e)&&t.remove()})})},e.renewIndex=function(t,e){var r=this,n=this.tags.join(", "),o=this.assocs.map(function(t){return new RegExp("("+t.description+"(\\[|\\]\\[|_)?)\\d+")});t.querySelectorAll(n).forEach(function(t){r.attributes.forEach(function(r){var n=t.getAttribute(r);n&&(o.forEach(function(t){n=n.replace(t,"$1"+e)}),t.setAttribute(r,n))})})},r(t,[{key:"forms",get:function(){return this.controller.formTargets}},{key:"template",get:function(){return this.forms.slice(-1)[0]}},{key:"tags",get:function(){return this.controller.constructor.tags}},{key:"attributes",get:function(){return this.controller.constructor.attributes}},{key:"assocs",get:function(){return this.controller.assocs}}])}(),a=/*#__PURE__*/function(t){function e(){return t.apply(this,arguments)||this}var o,a;a=t,(o=e).prototype=Object.create(a.prototype),o.prototype.constructor=o,n(o,a);var u=e.prototype;return u.initialize=function(){this.builder=new i(this)},u.add=function(t){for(var e=0;e<this.incrementValue;e++){var r=this.builder.run();if(!this.dispatch("before-add",{detail:{form:r}}).defaultPrevented&&(this.addForm(r),this.dispatch("after-add",{detail:{form:r}}),this.hasMaxForms()))break}t.preventDefault()},u.remove=function(t){var e=t.target.closest("[data-"+this.identifier+'-target="form"]');e&&(this.dispatch("before-remove",{detail:{form:e}}).defaultPrevented||(this.removeForm(e),this.dispatch("after-remove",{detail:{form:e}}),t.preventDefault()))},u.addForm=function(t){var e=this;"first"==this.addPosValue?this.formTargets[0].before(t):this.formTargets.slice(-1)[0].after(t),setTimeout(function(){t.querySelectorAll('[data-controller="'+e.identifier+'"]').forEach(function(t){var r=e.application.getControllerForElementAndIdentifier(t,e.identifier);r&&r.formTargets.forEach(function(t){return r.builder.removePK(t)})})}),this.refresh()},u.removeForm=function(t){t.style.display="none";var e=this.assocs.map(function(t){return new RegExp(t.description+"(\\])?\\[\\d+\\]\\[_destroy\\]")});t.querySelectorAll("input[name][type=hidden]").forEach(function(t){e.forEach(function(e){t.name.match(e)&&(t.value="1")})}),this.refresh()},u.refresh=function(){this.hasMaxForms()?this.toggleAdder(!1):this.toggleAdder(!0)},u.hasMaxForms=function(){return this.maxValue&&this.formTargets.filter(function(t){return"none"!=t.style.display}).length>=this.maxValue},u.toggleAdder=function(t){this.adder&&(this.adder.disabled=!t)},r(e,[{key:"adder",get:function(){return this.scope.findElement('[data-action="'+this.identifier+'#add"]')}},{key:"assocs",get:function(){var t=[].concat(this.associationsValue),e=[].concat(this.suffixesValue),r=[].concat(this.primaryKeysValue);return t.map(function(t,n){return{description:""+t+(e[n]||e[0]),pk:r[n]||r[0]}})}}])}(t.Controller);return a.targets=["form"],a.values={start:{type:Number,default:0},increment:{type:Number,default:1},max:Number,addPos:{type:String,default:"last"},associations:{type:Array,default:[""]},suffixes:{type:Array,default:["_attributes"]},primaryKeys:{type:Array,default:["id"]}},a.tags=["input","textarea","select","label"],a.attributes=["id","name","for"],a});
//# sourceMappingURL=index.umd.js.map
