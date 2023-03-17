Blockly.Blocks["text"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("\"")
        .appendField(new Blockly.FieldTextInput(""), "text_input")
        .appendField("\"");
    this.setInputsInline(false);
    this.setOutput(true, "STRING");
    this.setColour("%{BKY_TEXTS_HUE}");
  }
};

Blockly.JavaScript["text"] = function(block) {
  return `\"${(block.getFieldValue("text_input"))}\"`;
};
