Blockly.Blocks["from"] = {
  init: function() {
    this.setHelpUrl("https://www.w3schools.com/sql/sql_ref_from.asp");
    this.setStyle("list_blocks");
    this.itemCount_ = 1;
    this.updateShape_();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("%{BKY_LOOPS_HUE}");
    this.setMutator(new Blockly.Mutator(["lists_create_with_item"]));
  },
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
    this.updateShape_();
  },
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock("lists_create_with_container");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock("lists_create_with_item");
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don"t belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput("ADD" + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, "ADD" + i);
    }
  },
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    var i = 0;
    while (itemBlock) {
      var input = this.getInput("ADD" + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function() {
    if (this.itemCount_ && this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY")
          .appendField(Blockly.Msg["LISTS_CREATE_EMPTY_TITLE"]);
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("ADD" + i)) {
        var input = this.appendValueInput("ADD" + i);
        if (i == 0) {
          input.appendField("FROM");
          input.setCheck(null);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput("ADD" + i)) {
      this.removeInput("ADD" + i);
      i++;
    }
  }
};

Blockly.Blocks["lists_create_with_container"] = {
  init: function() {
    this.setStyle("list_blocks");
    this.appendDummyInput()
        .appendField("Attribute");
    this.appendStatementInput("STACK");
    this.setTooltip();
    this.contextMenu = false;
    this.setColour("%{BKY_LOOPS_HUE}");
  }
};

Blockly.Blocks["lists_create_with_item"] = {
  init: function() {
    this.setStyle("list_blocks");
    this.appendDummyInput()
        .appendField("Attribut");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
    this.contextMenu = false;
    this.setColour("%{BKY_LOOPS_HUE}");
  }
};

Blockly.JavaScript["from"] = function(block) {
    var code = "";
    for (var i = 0; i < this.itemCount_; i++) {
      code += Blockly.JavaScript.statementToCode(block, ("ADD" + i));
      if ((i != this.itemCount_-1) && Blockly.JavaScript.statementToCode(block, ("ADD" + (i+1)))) {
        code += ",";
      }
    }
    return "\nFROM " + code;
};
