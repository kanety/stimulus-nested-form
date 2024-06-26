import { Application } from '@hotwired/stimulus';
import NestedFormController from 'index';

const application = Application.start();
application.register('nested-form', NestedFormController);

global.$ = document.querySelector.bind(document);
global.$$ = document.querySelectorAll.bind(document);
