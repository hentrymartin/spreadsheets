import * as math from "mathjs";

// Check for specific node
const checkForNode = (
  node: math.MathNode,
  variablesList: math.SymbolNode[]
) => {
  if (node instanceof math.ConstantNode) {
    return variablesList;
  }

  if (node instanceof math.SymbolNode) {
    variablesList.push(node);
  } else if (node instanceof math.OperatorNode) {
    node.args.map((element: math.MathNode) => {
      return checkForNode(element, variablesList) as math.SymbolNode[];
    });
  } else if (node instanceof math.ParenthesisNode) {
    node.content.args.map((element: math.MathNode) => {
      return checkForNode(element, variablesList) as math.SymbolNode[];
    });
  }

  return variablesList;
};

/**
 * This function would collect all the nodes which are variables aka SymbolNodes
 * @param node 
 * @returns 
 */
export const collectAllVariables: any = (node: math.MathNode) => {
  return checkForNode(node, [] as math.SymbolNode[]);
};

export const modifyExpression = (nodes: math.SymbolNode[], expression: string) => {
  let modifiedExpression = expression;
  nodes.forEach((node: math.SymbolNode) => {
    let name = node.name;
    const number = name.replace(/[^\d.-]/g, '');
    const modifiedCellNumber = parseInt(number, 10);
    if (!isNaN(modifiedCellNumber)) {
      name = name.replace(number.toString(),  parseInt(number, 10).toString());
    }
    modifiedExpression = modifiedExpression.replace(node.name, name);
  });

  return modifiedExpression;
};