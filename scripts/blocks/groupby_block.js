Blockly.Blocks["groupby"] = {
    init: function() {
        this.appendValueInput("groupBy")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_LEFT)
            .appendField("GROUP BY ");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_LOOPS_HUE}");
        this.setHelpUrl("https://www.w3schools.com/sql/sql_groupby.asp");
    }
};
Blockly.JavaScript["groupby"] = function(block) {
    var code = Blockly.JavaScript.statementToCode(block, "groupInput");
    return "\nGROUP BY " + Blockly.JavaScript.statementToCode(block, "groupInput");
};
