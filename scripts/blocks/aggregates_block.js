Blockly.defineBlocksWithJsonArray([
    {
        "type": "aggregate_min",
        "message0": "MIN %1",
        "args0": [
            {
                "type": "input_value",
                "name": "min",
                "check": null
            },
        ],
        "inputsInline": true,
        "output": "MIN",
        "colour": "%{BKY_MATH_HUE}",
        "helpUrl": "https://www.w3schools.com/sql/sql_min_max.asp",
        "extensions": ["aggregate_Extensions"]
    },
    {
        "type": "aggregate_avg",
        "message0": "AVG %1",
        "args0": [
            {
                "type": "input_value",
                "name": "avg",
                "check": null
            }
        ],
        "inputsInline": true,
        "output": "AVG",
        "colour": "%{BKY_MATH_HUE}",
        "helpUrl": "https://www.w3schools.com/sql/sql_count_avg_sum.asp",
        "extensions": ["aggregate_Extensions"]
    },
    {
        "type": "aggregate_max",
        "message0": "MAX %1",
        "args0": [
            {
                "type": "input_value",
                "name": "max",
                "check": null
            }
        ],
        "inputsInline": true,
        "output": "MAX",
        "colour": "%{BKY_MATH_HUE}",
        "helpUrl": "https://www.w3schools.com/sql/sql_min_max.asp",
        "extensions": ["aggregate_Extensions"]
    },
    {
        "type": "aggregate_sum",
        "message0": "SUM %1",
        "args0": [
            {
                "type": "input_value",
                "name": "sum",
                "check": null
            }
        ],
        "inputsInline": true,
        "output": "SUM",
        "colour": "%{BKY_MATH_HUE}",
        "helpUrl": "https://www.w3schools.com/sql/sql_count_avg_sum.asp",
        "extensions": ["aggregate_Extensions"]
    },
    {
        "type": "aggregate_count",
        "message0": "COUNT %1",
        "args0": [
            {
                "type": "input_value",
                "name": "count",
                "check": null
            }
        ],
        "inputsInline": true,
        "output": "COUNT",
        "colour": "%{BKY_MATH_HUE}",
        "helpUrl": "https://www.w3schools.com/sql/sql_count_avg_sum.asp",
        "extensions": ["aggregate_Extensions"]
    }
]);

Blockly.Extensions.register("aggregate_Extensions", function(){
    this.setOnChange(function(changeEvent){
        var parent = this.getSurroundParent();
        if (parent) {
            if ((parent.type == "orderby") && (!this.getField("orderOptions"))){
                this.appendDummyInput("listOrder")
                    .appendField(" ")
                    .appendField(new Blockly.FieldDropdown([["\u2009",""], ["ASC","ASC"], ["DESC","DESC"]]), "orderOptions");
                return;
            }
        }
        if (((!parent)||(parent.type != "orderby")) && this.getField("orderOptions")){
            this.removeInput("listOrder");
        }
    })
});
Blockly.JavaScript["aggregate_min"] = function(block) {
    return getAggregateCode(block,"MIN");
};

Blockly.JavaScript["aggregate_max"] = function(block) {
    return getAggregateCode(block,"MAX");
};

Blockly.JavaScript["aggregate_sum"] = function(block) {
    return getAggregateCode(block,"SUM");
};

Blockly.JavaScript["aggregate_count"] = function(block) {
    return getAggregateCode(block,"COUNT");
};

Blockly.JavaScript["aggregate_avg"] = function(block) {
    return getAggregateCode(block,"AVG");
};

function getAggregateCode(block,aggregateName) {
    var argument = Blockly.JavaScript.statementToCode(block, aggregateName).trim();
    var orderOption = (block.getFieldValue("orderOptions")||(block.getFieldValue("orderOptions")!="")) ? ` ${block.getFieldValue("orderOptions")}`: "";
    return aggregateName+"("+argument+")"+orderOption;
};
