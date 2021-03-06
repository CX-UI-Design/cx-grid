/*
 * regular expression validation
 * you can use this form-validation for this project,as an extension script.
 * created: 2017/6/5.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */

// import { judgeType } from '../../../utils/index';

/**
 * judge type accurate
 * @param value
 * @returns {*}
 */
function judgeType(value) {
  const t = Object.prototype.toString.call(value);
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  if (value instanceof Element) {
    return 'element';
  }
  return map[t];
}

/**
 * validate rule private
 * @param val
 * @param type           rule type
 * @param rulesConfig    rule config list
 * @returns {*}
 */
export default function validateRule(val, type, rulesConfig = []) {
  let info = {};
  //if rules-config not exists,return true
  if (!rulesConfig || rulesConfig.length === 0) {
    return true;
  } else {
    //use rules-config directly, otherwise, you need to get the rules-config value (search form rules-info).
    //search from rules-config list
    for (let rule of rulesConfig) {
      if (rule.type === type) {
        info = rule;
        break;
      }
    }
  }
  const REG = info.ruleReg; //reg rule
  if (!REG) return true; //如果验证内容规则不存在，则直接抛出验证正确（跳过验证）
  const warmPrompt = info.warmPrompt; //warm prompt message

  /*---------------------
  complex ? = >
      judge is fun?
                  Yes => 1、run _complexValidate method
                  No  => 2、return true
  simple ? = >  validata value base on reg rule
  -----------------------*/
  let ruleStatus = info.complex
    ? judgeType(REG) === 'function'
      ? REG(val, info)
      : true
    : REG.test(val);
  //throw resault to validate-check
  return ruleStatus;
}
