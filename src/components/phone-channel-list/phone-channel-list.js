import {bindable, bindingMode, BindingEngine, inject} from 'aurelia-framework';

@inject(BindingEngine)
export class PhoneChannelList {
    @bindable({defaultBindingMode: bindingMode.twoWay}) items = [];
    @bindable newItem;

    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    attached() {
        this.subscription = this.bindingEngine
            .collectionObserver(this.items)
            .subscribe(this.listChanged);
    }

    detached() {
        this.subscription.dispose();
    }

    addItem() {
        if (this.newItem) {
            this.items.push(newItem);
        }
    }

    deleteItem(index) {
        this.items.splice(index, 1);
    }

    listChanged(slice) {
        console.log('list order changed', slice);
    }
}
