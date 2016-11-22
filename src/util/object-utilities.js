import ODataFilter from 'odata-filter-parser';
import _ from 'lodash';

let Operators = ODataFilter.Operators;

export var ObjectUtilities = {

    isEqual: function (objA, objB) {
        if (!objA || !objB) {
            return (!objA && !objB);
        }
        var aKeys = Object.keys(objA);
        var bKeys = Object.keys(objB);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
        for (var i = 0, len = aKeys.length; i < len; i++) {
            var key = aKeys[i];
            if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
                return false;
            }
        }
        return true;
    },

    deepExtend: function (destination, source) {
        for (var property in source) {
            if (source.hasOwnProperty(property)) {
                if (source[property] && source[property].constructor && source[property].constructor === Object) {
                    destination[property] = destination[property] || {};
                    ObjectUtilities.deepExtend(destination[property], source[property]);
                } else {
                    destination[property] = source[property];
                }
            }
        }
        return destination;
    }

};

export var PredicateUtilities = {

    removeMatches(subject, predicates) {
        let predicateList = _.clone(predicates);
        if (predicateList.length === 1 && !Operators.isLogical(predicateList[0].operator)) {
            if (predicateList[0].subject === subject) {
                predicateList.splice(0, 1);
            }
        } else {
            _.remove(predicateList, item => {
                return item.subject === subject;
            });
            let logicals = _.filter(predicateList, item => {
                return Operators.isLogical(item.operator);
            });
            if (logicals.length > 0) {
                _.forEach(logicals, logical => {
                    let flattened = logical.flatten();
                    let processed = PredicateUtilities.removeMatches(subject, flattened);
                    if (processed.length < flattened.length) {
                        let indx = _.indexOf(predicateList, logical);
                        predicateList.splice(indx, 1);
                    }
                });
            }
        }
        return predicateList;
    }
};

export var StringUtil = {

    pluralize: function (str, count) {
        var s = str;
        if (count > 1) {
            if (str.endsWith("y")) {
                s = str.substring(0, str.length - 1) + 'ies';
            } else {
                s += 's';
            }
        }
        return s;
    }
};
