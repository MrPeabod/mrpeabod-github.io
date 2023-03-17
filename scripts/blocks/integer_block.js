Blockly.Blocks["integer"] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0, -2147483647, 2147483647), "INT");
    this.setInputsInline(false);
    this.setOutput(true, "NUMBER");
    this.setColour("%{BKY_TEXTS_HUE}");
  }
};

Blockly.JavaScript["integer"] = function(block) {
  return block.getFieldValue("INT").toString();
};
