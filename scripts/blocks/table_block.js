Blockly.Blocks["table"] = {
  init: function() {
    this.appendValueInput("TABLE")
        .setCheck("COLUMN")
        .appendField(new Blockly.FieldDropdown(getTables()), "TABLE");
    this.setInputsInline(false);
    this.setOutput(true, "TABLE");
    this.setColour("%{BKY_LISTS_HUE}");
  }
};

Blockly.JavaScript["table"] = function(block) {
  let dropdown_table = block.getFieldValue("TABLE");
  let value_table = Blockly.JavaScript.statementToCode(block, "TABLE").trim();
  return dropdown_table+value_table;
};
