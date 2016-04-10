

/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 * @export
 */
define(function(){


var OperationNotSupported = function(message) {
  this.message = message || '';
};


/**
 * @type {string}
 */
OperationNotSupported.prototype.name = 'OperationNotSupported';

return OperationNotSupported;
});
 
