Blockly.Blocks["orderby"] = {
    init: function() {
        this.appendValueInput("orderInput")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_LEFT)
            .appendField("ORDER BY ");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_LOOPS_HUE}");
        this.setHelpUrl("https://www.w3schools.com/sql/sql_orderby.asp");
    }
};

Blockly.JavaScript["orderby"] = function(block) {
    return `\nORDER BY ${Blockly.JavaScript.statementToCode(block, "orderInput")}`;
};
