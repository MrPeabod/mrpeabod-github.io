Blockly.Blocks["or"] = {
    init: function() {
        this.appendValueInput("firstCondition")
            .setCheck(null)
            .appendField("OR");
        this.appendValueInput("secondCondition")
            .setCheck(null);
        this.setOutput(true, "OR");
        this.setColour("%{BKY_LOGIC_HUE}");
        this.setHelpUrl("https://www.w3schools.com/sql/sql_and_or.asp");
    }
};

Blockly.JavaScript["or"] = function(block) {
    var argument0 = Blockly.JavaScript.statementToCode(block, "firstCondition");
    var argument1 = Blockly.JavaScript.statementToCode(block, "secondCondition");
    return `(${argument0} OR ${argument1})`;
};
