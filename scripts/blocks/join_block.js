Blockly.Blocks["join"] = {
    init: function() {
        this.appendValueInput("STATEMENT")
            .setCheck(null)
            .appendField(new Blockly.FieldDropdown([["\u2009", ""], ["INNER", "INNER"], ["LEFT", "LEFT"], ["RIGHT", "RIGHT"]]), "joinType")
            .appendField("JOIN")
            .appendField(new Blockly.FieldDropdown(getTables()), "tableSelection")
            .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["\u2009", ""]]), "joinOn");    
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_LOOPS_HUE}");
        this.setHelpUrl("https://www.w3schools.com/sql/sql_join.asp");
    }
};

function swapStatement(block) {
    if (block.getFieldValue("joinOn") == "") {
        block.removeInput("STATEMENT");
        block.appendValueInput("STATEMENT")
            .setCheck(null)
            .appendField(new Blockly.FieldDropdown([["\u2009", ""], ["INNER", "INNER"], ["LEFT", "LEFT"], ["RIGHT", "RIGHT"]]), "joinType")
            .appendField("JOIN")
            .appendField(new Blockly.FieldDropdown([["\u2009", ""], ["ON", "ON"]]), "joinOn");
    } else if (block.getFieldValue("joinOn")=="ON") {
        block.removeInput("STATEMENT");
        block.appendValueInput("STATEMENT")
            .setCheck(null)
            .appendField(new Blockly.FieldDropdown([["\u2009", ""], ["INNER", "INNER"], ["LEFT", "LEFT"], ["RIGHT", "RIGHT"]]), "joinType")
            .appendField("JOIN")
            .appendField(new Blockly.FieldDropdown(getTables()), "tableSelection")
            .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["\u2009", ""]]), "joinOn");    
    }
};

Blockly.JavaScript["join"] = function(block) {
    var joinType = (block.getFieldValue("joinType")||(block.getFieldValue("joinType")!="")) ? `${block.getFieldValue("joinType")} ` : "";
    var tableSelection = (block.getFieldValue("tableSelection")) ? ` ${block.getFieldValue("tableSelection")}` : "";
    var joinOn = (block.getFieldValue("joinOn")) ? ` ${block.getFieldValue("joinOn")}` : "";
    var onSelection = (Blockly.JavaScript.statementToCode(block, "STATEMENT") != "") ? ` ${Blockly.JavaScript.statementToCode(block, "STATEMENT")}` : ` ${Blockly.JavaScript.statementToCode(block, "noSTATEMENT")}`;
    var code = `\n${joinType}JOIN${tableSelection}${joinOn}${onSelection}`;
    return code;
};
