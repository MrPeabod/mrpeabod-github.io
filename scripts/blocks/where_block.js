Blockly.Blocks["where"] = {
    init: function() {
        this.appendValueInput("where")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_LEFT)
            .appendField("WHERE ");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_LOOPS_HUE}");
        this.setHelpUrl("https://www.w3schools.com/sql/sql_where.asp");
    }
};

Blockly.JavaScript["where"] = function(block) {
    return `\nWHERE ${Blockly.JavaScript.statementToCode(block, "where")}`;
};
