Blockly.Blocks["not"] = {
    init: function() {
        this.appendValueInput("CONDITION")
            .setCheck(null)
            .appendField("NOT");
        this.setOutput(true, "NOT");
        this.setColour("%{BKY_LOGIC_HUE}");
        this.setHelpUrl("https://www.w3schools.com/sql/sql_and_or.asp");
    }
};

Blockly.JavaScript["not"] = function(block) {
    return `NOT ${Blockly.JavaScript.statementToCode(block, "CONDITION")}`;
};
