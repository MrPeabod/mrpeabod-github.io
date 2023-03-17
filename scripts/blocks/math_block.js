Blockly.Blocks["math"] = {
    init: function() {
        this.appendValueInput("Condition1")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_CENTRE);
        this.appendValueInput("Condition2")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["*","*"], ["/","/"]]), "math");
        this.setInputsInline(true);
        this.setOutput(true, "MATHCOMPARE");
        this.setColour("%{BKY_LOGIC_HUE}");
        this.setHelpUrl("https://www.w3schools.com/sql/sql_operators.asp");
    }
};

Blockly.JavaScript["math"] = function(block) {
    var operator = block.getFieldValue("math");
    var argument0 = Blockly.JavaScript.statementToCode(block, "Condition1").trim();
    var argument1 = Blockly.JavaScript.statementToCode(block, "Condition2").trim();
    return `(${argument0} ${operator} ${argument1})`;
};
