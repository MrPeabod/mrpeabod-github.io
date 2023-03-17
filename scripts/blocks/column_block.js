Blockly.Blocks["column"] = {
  init: function() {
    this.appendDummyInput("COLUMN")
        .appendField(".")
        .appendField(new Blockly.FieldDropdown([["Mit Tabellen Block verbinden",""]]), "COLUMN");
    this.setOutput(true, "COLUMN"); 
    this.setColour("%{BKY_LISTS_HUE}");
  }
};

Blockly.JavaScript["column"] = function(block) {
  return "."+block.getFieldValue("COLUMN");
};
