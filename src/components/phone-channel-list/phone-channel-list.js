import {inject, bindable} from 'aurelia-framework';

export class PhoneChannelList {
    listItems = [];
    @bindable newListItem;

    constructor() {
    }

    activate(bindingContext) {
        this.listItems = bindingContext;
    }

    newItem() {
        if (this.newListItem) {
            this.listItems.push(this.newListItem);
        }
    }

    deleteItem(item) {
        var index = this.listItems.indexOf(item);
        if (index > -1) {
            this.listItems.splice(index, 1);
        }
    }
}
