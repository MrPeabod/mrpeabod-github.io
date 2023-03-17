Blockly.Blocks["compare"] = {
    init: function() {
        this.appendValueInput("firstCondition")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["=", "="], ["\u2260", "!="], ["<", "<"], ["\u2264", "<="], [">", ">"], ["\u2265", ">="], ["LIKE", "LIKE"]]), "compareOptions");
        this.appendValueInput("secondCondition")
            .setCheck(null);
        this.setInputsInline(true);
        this.setOutput(true, "COMPARE");
        this.setColour("%{BKY_LOGIC_HUE}");
        this.setHelpUrl("https://www.w3schools.com/sql/sql_operators.asp");
    }
};

Blockly.JavaScript["compare"] = function(block) {
    var operator = block.getFieldValue("compareOptions");
    var argument0 = Blockly.JavaScript.statementToCode(block, "firstCondition");
    var argument1 = Blockly.JavaScript.statementToCode(block, "secondCondition");
    return `${argument0} ${operator} ${argument1}`;
};
