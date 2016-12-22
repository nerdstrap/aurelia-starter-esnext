import {inject, bindable} from 'aurelia-framework';

export class PhoneChannelListItem {
    @bindable remove;
    @bindable item;

    constructor(_item) {
    }

    bind(_item) {
    }

    removeItem() {
        this.remove({item: this.item});
    }
}
