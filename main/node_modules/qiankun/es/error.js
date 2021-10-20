import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import _wrapNativeSuper from "@babel/runtime/helpers/esm/wrapNativeSuper";
export var QiankunError = /*#__PURE__*/function (_Error) {
  _inherits(QiankunError, _Error);

  var _super = _createSuper(QiankunError);

  function QiankunError(message) {
    _classCallCheck(this, QiankunError);

    return _super.call(this, "[qiankun]: ".concat(message));
  }

  return QiankunError;
}( /*#__PURE__*/_wrapNativeSuper(Error));