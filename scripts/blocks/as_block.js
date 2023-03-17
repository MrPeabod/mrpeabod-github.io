Blockly.Blocks["as"] = {
    init: function() {
        this.appendValueInput("asOldName")
            .setCheck(null);
        this.appendValueInput("asNewName")
            .setCheck(null)
            .appendField("AS");
        this.setInputsInline(true);
        this.setOutput(true, "AS");
        this.setColour("%{BKY_LISTS_HUE}");
        this.setHelpUrl("https://www.w3schools.com/sql/sql_alias.asp");
    }
};

Blockly.JavaScript["as"] = function(block) {
    return `${Blockly.JavaScript.statementToCode(block, "asOldName")} AS ${Blockly.JavaScript.statementToCode(block, "asNewName")}`;
};
