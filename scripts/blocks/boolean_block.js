Blockly.Blocks["bool"] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["true","true"], ["false","false"]]), "BOOLEAN");
    this.setInputsInline(false);
    this.setOutput(true, "BOOLEAN");
    this.setColour("%{BKY_TEXTS_HUE}");
  }
};

Blockly.JavaScript["bool"] = function(block) {
  return block.getFieldValue("BOOLEAN");
};
