Blockly.Blocks["having"] = {
    init: function() {
        this.appendValueInput("having")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_LEFT)
            .appendField("HAVING ");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_LOOPS_HUE}");
        this.setHelpUrl("https://www.w3schools.com/sql/sql_having.asp");
        this.setInputsInline(false);
    }
};

Blockly.JavaScript["having"] = function(block) {
    return `\nHAVING ${Blockly.JavaScript.statementToCode(block, "having")}`;
};
