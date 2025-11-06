// Simplified jQuery type definitions for IntelliSense (by ChatGPT)
// Guarda este archivo como: js/jquery.d.ts
// Luego, en tu script usa:
// /// <reference path="./jquery.d.ts" />

declare var $: JQueryStatic;
declare var jQuery: JQueryStatic;

interface JQueryStatic {
  (selector: string | HTMLElement | Document | Window): JQuery;
  (readyCallback: (this: Document, $: JQueryStatic) => void): JQuery;
  ajax(settings: JQueryAjaxSettings): void;
  get(url: string, success?: (data: any) => void): void;
  post(url: string, data?: any, success?: (data: any) => void): void;
  each<T>(array: T[], callback: (index: number, value: T) => void): void;
}

interface JQuery {
  // Element selection and traversal
  find(selector: string): JQuery;
  parent(selector?: string): JQuery;
  children(selector?: string): JQuery;
  first(): JQuery;
  last(): JQuery;
  eq(index: number): JQuery;

  // CSS and visibility
  show(duration?: number): JQuery;
  hide(duration?: number): JQuery;
  toggle(duration?: number): JQuery;
  fadeIn(duration?: number): JQuery;
  fadeOut(duration?: number): JQuery;
  css(propertyName: string, value?: string | number): JQuery;
  addClass(className: string): JQuery;
  removeClass(className: string): JQuery;
  toggleClass(className: string): JQuery;

  // Attributes and properties
  attr(attributeName: string, value?: string): string | JQuery;
  prop(propertyName: string, value?: any): any;
  val(value?: string): string | JQuery;
  text(value?: string): string | JQuery;
  html(value?: string): string | JQuery;

  // Content manipulation
  append(content: string | JQuery | HTMLElement): JQuery;
  prepend(content: string | JQuery | HTMLElement): JQuery;
  after(content: string | JQuery | HTMLElement): JQuery;
  before(content: string | JQuery | HTMLElement): JQuery;
  remove(): JQuery;
  empty(): JQuery;

  // Events
  on(event: string, handler: (eventObject: any) => void): JQuery;
  off(event: string): JQuery;
  click(handler: (eventObject: any) => void): JQuery;
  change(handler: (eventObject: any) => void): JQuery;
  ready(handler: (eventObject: any) => void): JQuery;

  // Data and iteration
  each(callback: (index: number, element: HTMLElement) => void): JQuery;
  data(key: string, value?: any): any;
  length: number;

  // AJAX helper
  load(url: string, data?: any, complete?: (responseText: string) => void): JQuery;
}

interface JQueryAjaxSettings {
  url: string;
  method?: string;
  dataType?: string;
  data?: any;
  success?: (data: any) => void;
  error?: (jqXHR: any, textStatus: string, errorThrown: string) => void;
}
