import { Message } from 'element-ui';

let messageInstance = null;

/**
 * limit messages
 * @param options
 * @param limit
 * @returns {ElMessageComponent}
 * @constructor
 */
const LimitMessage = function(options, limit = 1) {
  const l = document.body.getElementsByClassName('el-message').length;

  if (messageInstance && l >= limit) {
    messageInstance.close();
  }

  //compatible with IE self execution
  if (options && typeof options === 'object') {
    messageInstance = Message(options);
  } else {
    messageInstance = Message;
  }

  return messageInstance;
};

['success', 'warning', 'info', 'error'].forEach(type => {
  LimitMessage[type] = (options, limit = 1) => {
    if (typeof options === 'string') {
      options = {
        message: options,
      };
    }
    options.type = type;

    return LimitMessage(options, limit);
  };
});

export default LimitMessage;
