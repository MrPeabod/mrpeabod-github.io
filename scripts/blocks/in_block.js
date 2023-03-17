Blockly.Blocks["in"] = {
  init: function() {
    this.appendValueInput("input1")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendStatementInput("input2")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["IN","IN"], ["NOT IN","NOT IN"]]), "IN");
    this.setInputsInline(true);
    this.setOutput(true, "IN");
    this.setColour("%{BKY_LOGIC_HUE}");
  this.setHelpUrl("https://www.w3schools.com/sql/sql_in.asp");
  }
};

Blockly.JavaScript["in"] = function(block) {
  var operator = block.getFieldValue("IN");
  var argument0 = Blockly.JavaScript.statementToCode(block, "input1");
  var argument1 = Blockly.JavaScript.statementToCode(block, "input2");
  return `${argument0} ${operator} ${argument1}`;
};
