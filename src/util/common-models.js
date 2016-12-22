import _ from 'lodash';

export class EnumSymbol {
    sym = Symbol.for(name);
    ordinal;
    description;
    keyName;

    constructor(name, {ordinal, description}) {
        if (!Object.is(ordinal, undefined)) {
            this.ordinal = ordinal;
        }
        if (description) {
            this.description = description;
        }
        this.keyName = name;
        Object.freeze(this);
    }

    get display() {
        return this.description || Symbol.keyFor(this.sym);
    }

    get key() {
        return this.keyName;
    }

    toString() {
        return this.sym;
    }

    valueOf() {
        return this.ordinal;
    }
}

export class Enum {
    constructor(enumLiterals) {
        for (let key in enumLiterals) {
            if (enumLiterals.hasOwnProperty(key)) {
                if (!enumLiterals[key]) {
                    throw new TypeError('each enum should have been initialized with at least empty {} value');
                }
                this[key] = new EnumSymbol(key, enumLiterals[key]);
            }
        }
        Object.freeze(this);
    }

    symbols() {
        let syms = [];
        let self = this;
        Object.keys(this).forEach(function (k) {
            syms.push(self[k]);
        });
        return syms; //for (key of Object.keys(this)) this[key];
    }

    keys() {
        return Object.keys(this);
    }

    contains(sym) {
        if (!(sym instanceof EnumSymbol)) {
            return false;
        }
        return this[Symbol.keyFor(sym.sym)] === sym;
    }

    get(ordinal) {
        let self = this;
        let symbol;
        this.keys().forEach(k => {
            if (self[k].ordinal === +ordinal) {
                symbol = self[k];
            }
        });
        return symbol;
    }
}

export const ActionCode = new Enum({
    ALLOW: {ordinal: 0, description: 'actionCode.ALLOW'},
    CHALLENGE: {ordinal: 1, description: 'actionCode.CHALLENGE'},
    NONE: {ordinal: 2, description: 'actionCode.NONE'},
    REVIEW: {ordinal: 3, description: 'actionCode.REVIEW'}
});

export const CredentialType = new Enum({
    PASSWORD: {ordinal: 0, description: 'credentialType.PASSWORD'},
    QUESTIONS: {ordinal: 1, description: 'credentialType.QUESTIONS'},
    EMAIL: {ordinal: 2, description: 'credentialType.EMAIL'},
    PHONE: {ordinal: 3, description: 'credentialType.PHONE'},
    PIN: {ordinal: 3, description: 'credentialType.PIN'}
});


let determineShiftedValues = (total, highestValue) => {
    let values = [];
    let runningTotal = total;
    for (let i = highestValue; i >= 0; i--) {
        if (runningTotal >> i === 1) {
            let binValue = Math.pow(2, i);
            runningTotal = runningTotal - binValue;
            values.push(binValue);
        }
    }
    return values;
};

export let EnumeratedTypeHelper = function () {
    return {
        asArray: (type, value) => {
            if (value === undefined) {
                return [];
            }
            let v = determineShiftedValues(value, type.symbols().length);
            let enums = [];
            _.forEach(v, ordinal => {
                enums.push(type.get(ordinal));
            });
            return enums;
        }
    };
}();
