Blockly.Blocks["and"] = {
    init: function() {
        this.appendValueInput("firstCondition")
            .setCheck(null)
            .appendField("AND");
        this.appendValueInput("secondCondition")
            .setCheck(null);
        this.setOutput(true, "AND");
        this.setColour("%{BKY_LOGIC_HUE}");
        this.setHelpUrl("https://www.w3schools.com/sql/sql_and_or.asp");
    }
};

Blockly.JavaScript["and"] = function(block) {
    var code = `${Blockly.JavaScript.statementToCode(block, "firstCondition")} AND ${Blockly.JavaScript.statementToCode(block, "lastCondition")}`;
    return "(" + code + ")";
};
