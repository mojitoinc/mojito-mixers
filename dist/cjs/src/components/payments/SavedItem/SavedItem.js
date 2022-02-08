'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var Edit = require('../../../../node_modules/@mui/icons-material/Edit.js');
var Delete = require('../../../../node_modules/@mui/icons-material/Delete.js');
var SecondaryButton = require('../../shared/SecondaryButton/SecondaryButton.js');
var material = require('@mui/material');
var React = require('react');
var DisplayBox = require('../DisplayBox/DisplayBox.js');
var Box = require('../../../../node_modules/@mui/material/Box/Box.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var DEFAULT_SAVED_ITEM_LABELS = {
  active: "Active",
  edit: "Edit Info",
  "delete": "Delete",
  select: "Use Info"
};
var SavedItem = function SavedItem(_a) {
  var children = _a.children,
      id = _a.id,
      _b = _a.variant,
      variant = _b === void 0 ? "stacked" : _b,
      _c = _a.labels,
      customLabels = _c === void 0 ? {} : _c,
      disabled = _a.disabled,
      active = _a.active,
      status = _a.status,
      onEdit = _a.onEdit,
      onDelete = _a.onDelete,
      onPick = _a.onPick,
      boxProps = _a.boxProps;

  var labels = tslib_es6.__assign(tslib_es6.__assign({}, DEFAULT_SAVED_ITEM_LABELS), customLabels);

  var hasControls = active || onEdit || onDelete || onPick;
  var handleClick = React.useCallback(function (e) {
    var currentTarget = e.currentTarget;
    var action = currentTarget.dataset.action;
    if (!action) return;
    var callback = {
      edit: onEdit,
      "delete": onDelete,
      pick: onPick
    }[action];
    if (callback) callback(id, e);
  }, [id, onEdit, onDelete, onPick]);
  var disabledSelect = !!disabled;
  var disabledOther = disabled === true;
  var mainControlElement = null;

  if (status) {
    mainControlElement = /*#__PURE__*/React__default["default"].createElement(material.Tooltip, {
      title: status.tooltip
    }, /*#__PURE__*/React__default["default"].createElement(material.Chip, {
      size: "small",
      color: status.color,
      label: status.label,
      variant: "outlined"
    }));
  } else if (active) {
    mainControlElement = /*#__PURE__*/React__default["default"].createElement(material.Chip, {
      size: "small",
      color: "success",
      label: "Active",
      variant: "outlined"
    });
  } else if (onPick) {
    mainControlElement = /*#__PURE__*/React__default["default"].createElement(SecondaryButton.SecondaryButton, {
      onClick: handleClick,
      disabled: disabledSelect,
      "data-action": "pick"
    }, labels.select);
  }

  return /*#__PURE__*/React__default["default"].createElement(DisplayBox.DisplayBox, tslib_es6.__assign({}, boxProps), variant === "stacked" ? /*#__PURE__*/React__default["default"].createElement(Box["default"], {
    sx: {
      flex: 1,
      pb: 2
    }
  }, children) : /*#__PURE__*/React__default["default"].createElement(material.Stack, {
    direction: "row",
    spacing: 2,
    sx: {
      flex: 1,
      pb: {
        xs: 2,
        sm: 0
      },
      alignItems: "center"
    }
  }, children), hasControls && /*#__PURE__*/React__default["default"].createElement(material.Stack, {
    direction: variant === "stacked" ? {
      xs: "row",
      sm: "column"
    } : "row",
    spacing: 1,
    sx: {
      // display: "flex",
      // flexDirection: {
      //   xs: "column",
      //   sm: "column"
      // },
      justifyContent: "space-between",
      alignItems: "flex-end",
      height: "auto"
    }
  }, mainControlElement, /*#__PURE__*/React__default["default"].createElement(material.Stack, {
    direction: "row",
    spacing: 1,
    sx: {
      pt: variant === "stacked" ? {
        xs: 0,
        sm: 1
      } : 0,
      mt: "auto"
    }
  }, onEdit && /*#__PURE__*/React__default["default"].createElement(SecondaryButton.SecondaryButton, {
    onClick: handleClick,
    disabled: disabledOther,
    startIcon: /*#__PURE__*/React__default["default"].createElement(Edit["default"], null),
    "data-action": "edit"
  }, labels.edit), onDelete && /*#__PURE__*/React__default["default"].createElement(material.Tooltip, {
    title: labels["delete"]
  }, /*#__PURE__*/React__default["default"].createElement(SecondaryButton.SecondaryButton, {
    onClick: handleClick,
    disabled: disabledOther,
    "data-action": "delete"
  }, /*#__PURE__*/React__default["default"].createElement(Delete["default"], null))))));
};

exports.SavedItem = SavedItem;
//# sourceMappingURL=SavedItem.js.map
